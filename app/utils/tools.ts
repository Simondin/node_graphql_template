import { basename, dirname, extname, join } from 'path';
import { readdirSync, readFileSync, statSync } from 'fs'

enum EXT_TYPES {
    JS = '.js',
    TS = '.ts',
    GRAPHQL = '.graphql',
}

const EXT_TYPES_VALUES = Object.values(EXT_TYPES)

enum GRAPHQL_TYPES {
    MUTATION = 'Mutation',
    QUERY = 'Query'
}

type RequireFileType = {
    name: string,
    path: string,
    ext: string,
    exports: any,
    type: GRAPHQL_TYPES,
}

type ResolverType = {
    Mutation: object,
    Query: object,
}

const typeRegex = /(mutation|query)/i

function requireRecusive(dir: string, file: string, results: RequireFileType[]) {
    const valid_exts = EXT_TYPES_VALUES
    const filePath = join(dir, file)
    const fileStats = statSync(filePath)

    const isDirectory = fileStats.isDirectory()
    const isFile = fileStats.isFile() || fileStats.isSymbolicLink()

    // If the current file is a directory search into it.
    if (isDirectory) {
        let tryFiles
        try { tryFiles = readdirSync(filePath) }
        catch (err) { }

        for (const file of tryFiles || []) {
            requireRecusive(filePath, file, results)
        }

        return
    }

    if (! isFile) {
        return
    }

    const fileExt = extname(file)
    const fileName = basename(file, fileExt)
    const typeMatch = filePath.match(typeRegex)?.[0]

    switch (true) {
        // Check it the file have a valid extension.
        case !valid_exts.includes(fileExt as EXT_TYPES):
        // We don't want to cover the index file case
        case fileName === 'index':
        // Check if a valid GraphQl type is in the file path
        case !typeMatch:
            return
    }

    results.push({
        name: basename(file, fileExt).replace(`${typeMatch}.`,''),
        path: dirname(filePath),
        ext: fileExt.slice(1),
        exports: require(filePath),//require(filePath),
        type: typeMatch && typeMatch.toLowerCase() === GRAPHQL_TYPES.MUTATION.toLowerCase()
            ? GRAPHQL_TYPES.MUTATION
            : GRAPHQL_TYPES.QUERY
    })

}

/**
 * Read and import all the graphql resolvers from the given directory.
 * @param dir The direcoty path to analize.
 * @returns All the resolvers founded.
 */
function requireGQLResolvers(dir: string) : ResolverType {
    const results: RequireFileType[] = []
    requireRecusive(dir, '', results)

    const resolvers = {
        Mutation: {},
        Query: {}
    }

    for (const it of results) {
        switch (it.type) {
            case GRAPHQL_TYPES.MUTATION:
                resolvers.Mutation = {
                    ...resolvers.Mutation,
                    [it.name]: it.exports,
                }
                break
            case GRAPHQL_TYPES.QUERY:
                resolvers.Query = {
                    ...resolvers.Query,
                    [it.name]: it.exports,
                }
                break
        }
    }

    return resolvers
}

/**
 * Reads all the graphql definition from the given directory.
 * @param dir The direcoty path to analize.
 * @returns All the GraphQL definitions.
 */
function requireGQLDefinitions(dir: string) : string {
    const gqlFiles = readdirSync(dir);

    let typeDefs = '';
    for (const it of gqlFiles) {
        const fileExt = extname(it)
        if (fileExt !== EXT_TYPES.GRAPHQL) {
            continue
        }

        typeDefs += readFileSync(join(dir, it), {
            encoding: 'utf8',
        })
    }

    return typeDefs
}

export {
    requireGQLResolvers,
    requireGQLDefinitions,
}