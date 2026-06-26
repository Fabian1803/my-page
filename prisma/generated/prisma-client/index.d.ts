
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Dispositivo
 * 
 */
export type Dispositivo = $Result.DefaultSelection<Prisma.$DispositivoPayload>
/**
 * Model MediaResource
 * 
 */
export type MediaResource = $Result.DefaultSelection<Prisma.$MediaResourcePayload>
/**
 * Model Categoria
 * 
 */
export type Categoria = $Result.DefaultSelection<Prisma.$CategoriaPayload>
/**
 * Model Enlace
 * 
 */
export type Enlace = $Result.DefaultSelection<Prisma.$EnlacePayload>
/**
 * Model Vineta
 * 
 */
export type Vineta = $Result.DefaultSelection<Prisma.$VinetaPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Usuarios
 * const usuarios = await prisma.usuario.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuario.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dispositivo`: Exposes CRUD operations for the **Dispositivo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dispositivos
    * const dispositivos = await prisma.dispositivo.findMany()
    * ```
    */
  get dispositivo(): Prisma.DispositivoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mediaResource`: Exposes CRUD operations for the **MediaResource** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MediaResources
    * const mediaResources = await prisma.mediaResource.findMany()
    * ```
    */
  get mediaResource(): Prisma.MediaResourceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.categoria`: Exposes CRUD operations for the **Categoria** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categorias
    * const categorias = await prisma.categoria.findMany()
    * ```
    */
  get categoria(): Prisma.CategoriaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.enlace`: Exposes CRUD operations for the **Enlace** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Enlaces
    * const enlaces = await prisma.enlace.findMany()
    * ```
    */
  get enlace(): Prisma.EnlaceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vineta`: Exposes CRUD operations for the **Vineta** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vinetas
    * const vinetas = await prisma.vineta.findMany()
    * ```
    */
  get vineta(): Prisma.VinetaDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Usuario: 'Usuario',
    Dispositivo: 'Dispositivo',
    MediaResource: 'MediaResource',
    Categoria: 'Categoria',
    Enlace: 'Enlace',
    Vineta: 'Vineta'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "usuario" | "dispositivo" | "mediaResource" | "categoria" | "enlace" | "vineta"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Dispositivo: {
        payload: Prisma.$DispositivoPayload<ExtArgs>
        fields: Prisma.DispositivoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DispositivoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DispositivoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DispositivoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DispositivoPayload>
          }
          findFirst: {
            args: Prisma.DispositivoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DispositivoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DispositivoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DispositivoPayload>
          }
          findMany: {
            args: Prisma.DispositivoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DispositivoPayload>[]
          }
          create: {
            args: Prisma.DispositivoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DispositivoPayload>
          }
          createMany: {
            args: Prisma.DispositivoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DispositivoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DispositivoPayload>[]
          }
          delete: {
            args: Prisma.DispositivoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DispositivoPayload>
          }
          update: {
            args: Prisma.DispositivoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DispositivoPayload>
          }
          deleteMany: {
            args: Prisma.DispositivoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DispositivoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DispositivoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DispositivoPayload>[]
          }
          upsert: {
            args: Prisma.DispositivoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DispositivoPayload>
          }
          aggregate: {
            args: Prisma.DispositivoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDispositivo>
          }
          groupBy: {
            args: Prisma.DispositivoGroupByArgs<ExtArgs>
            result: $Utils.Optional<DispositivoGroupByOutputType>[]
          }
          count: {
            args: Prisma.DispositivoCountArgs<ExtArgs>
            result: $Utils.Optional<DispositivoCountAggregateOutputType> | number
          }
        }
      }
      MediaResource: {
        payload: Prisma.$MediaResourcePayload<ExtArgs>
        fields: Prisma.MediaResourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MediaResourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MediaResourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload>
          }
          findFirst: {
            args: Prisma.MediaResourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MediaResourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload>
          }
          findMany: {
            args: Prisma.MediaResourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload>[]
          }
          create: {
            args: Prisma.MediaResourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload>
          }
          createMany: {
            args: Prisma.MediaResourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MediaResourceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload>[]
          }
          delete: {
            args: Prisma.MediaResourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload>
          }
          update: {
            args: Prisma.MediaResourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload>
          }
          deleteMany: {
            args: Prisma.MediaResourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MediaResourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MediaResourceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload>[]
          }
          upsert: {
            args: Prisma.MediaResourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload>
          }
          aggregate: {
            args: Prisma.MediaResourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMediaResource>
          }
          groupBy: {
            args: Prisma.MediaResourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediaResourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.MediaResourceCountArgs<ExtArgs>
            result: $Utils.Optional<MediaResourceCountAggregateOutputType> | number
          }
        }
      }
      Categoria: {
        payload: Prisma.$CategoriaPayload<ExtArgs>
        fields: Prisma.CategoriaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoriaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoriaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          findFirst: {
            args: Prisma.CategoriaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoriaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          findMany: {
            args: Prisma.CategoriaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          create: {
            args: Prisma.CategoriaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          createMany: {
            args: Prisma.CategoriaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoriaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          delete: {
            args: Prisma.CategoriaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          update: {
            args: Prisma.CategoriaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          deleteMany: {
            args: Prisma.CategoriaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoriaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoriaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          upsert: {
            args: Prisma.CategoriaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          aggregate: {
            args: Prisma.CategoriaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategoria>
          }
          groupBy: {
            args: Prisma.CategoriaGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoriaGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoriaCountArgs<ExtArgs>
            result: $Utils.Optional<CategoriaCountAggregateOutputType> | number
          }
        }
      }
      Enlace: {
        payload: Prisma.$EnlacePayload<ExtArgs>
        fields: Prisma.EnlaceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EnlaceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnlacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EnlaceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnlacePayload>
          }
          findFirst: {
            args: Prisma.EnlaceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnlacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EnlaceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnlacePayload>
          }
          findMany: {
            args: Prisma.EnlaceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnlacePayload>[]
          }
          create: {
            args: Prisma.EnlaceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnlacePayload>
          }
          createMany: {
            args: Prisma.EnlaceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EnlaceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnlacePayload>[]
          }
          delete: {
            args: Prisma.EnlaceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnlacePayload>
          }
          update: {
            args: Prisma.EnlaceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnlacePayload>
          }
          deleteMany: {
            args: Prisma.EnlaceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EnlaceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EnlaceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnlacePayload>[]
          }
          upsert: {
            args: Prisma.EnlaceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnlacePayload>
          }
          aggregate: {
            args: Prisma.EnlaceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEnlace>
          }
          groupBy: {
            args: Prisma.EnlaceGroupByArgs<ExtArgs>
            result: $Utils.Optional<EnlaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.EnlaceCountArgs<ExtArgs>
            result: $Utils.Optional<EnlaceCountAggregateOutputType> | number
          }
        }
      }
      Vineta: {
        payload: Prisma.$VinetaPayload<ExtArgs>
        fields: Prisma.VinetaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VinetaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinetaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VinetaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinetaPayload>
          }
          findFirst: {
            args: Prisma.VinetaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinetaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VinetaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinetaPayload>
          }
          findMany: {
            args: Prisma.VinetaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinetaPayload>[]
          }
          create: {
            args: Prisma.VinetaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinetaPayload>
          }
          createMany: {
            args: Prisma.VinetaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VinetaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinetaPayload>[]
          }
          delete: {
            args: Prisma.VinetaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinetaPayload>
          }
          update: {
            args: Prisma.VinetaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinetaPayload>
          }
          deleteMany: {
            args: Prisma.VinetaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VinetaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VinetaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinetaPayload>[]
          }
          upsert: {
            args: Prisma.VinetaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VinetaPayload>
          }
          aggregate: {
            args: Prisma.VinetaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVineta>
          }
          groupBy: {
            args: Prisma.VinetaGroupByArgs<ExtArgs>
            result: $Utils.Optional<VinetaGroupByOutputType>[]
          }
          count: {
            args: Prisma.VinetaCountArgs<ExtArgs>
            result: $Utils.Optional<VinetaCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    usuario?: UsuarioOmit
    dispositivo?: DispositivoOmit
    mediaResource?: MediaResourceOmit
    categoria?: CategoriaOmit
    enlace?: EnlaceOmit
    vineta?: VinetaOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    dispositivos: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dispositivos?: boolean | UsuarioCountOutputTypeCountDispositivosArgs
  }

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountDispositivosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DispositivoWhereInput
  }


  /**
   * Count Type MediaResourceCountOutputType
   */

  export type MediaResourceCountOutputType = {
    categorias: number
    enlaces: number
    vinetas: number
  }

  export type MediaResourceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categorias?: boolean | MediaResourceCountOutputTypeCountCategoriasArgs
    enlaces?: boolean | MediaResourceCountOutputTypeCountEnlacesArgs
    vinetas?: boolean | MediaResourceCountOutputTypeCountVinetasArgs
  }

  // Custom InputTypes
  /**
   * MediaResourceCountOutputType without action
   */
  export type MediaResourceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResourceCountOutputType
     */
    select?: MediaResourceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MediaResourceCountOutputType without action
   */
  export type MediaResourceCountOutputTypeCountCategoriasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoriaWhereInput
  }

  /**
   * MediaResourceCountOutputType without action
   */
  export type MediaResourceCountOutputTypeCountEnlacesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnlaceWhereInput
  }

  /**
   * MediaResourceCountOutputType without action
   */
  export type MediaResourceCountOutputTypeCountVinetasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VinetaWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    createdAt: number
    _all: number
  }


  export type UsuarioMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    createdAt?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    createdAt?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    createdAt: Date
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    dispositivos?: boolean | Usuario$dispositivosArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "createdAt", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dispositivos?: boolean | Usuario$dispositivosArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      dispositivos: Prisma.$DispositivoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      createdAt: Date
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dispositivos<T extends Usuario$dispositivosArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$dispositivosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DispositivoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly passwordHash: FieldRef<"Usuario", 'String'>
    readonly createdAt: FieldRef<"Usuario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario updateManyAndReturn
   */
  export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario.dispositivos
   */
  export type Usuario$dispositivosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispositivo
     */
    select?: DispositivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispositivo
     */
    omit?: DispositivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DispositivoInclude<ExtArgs> | null
    where?: DispositivoWhereInput
    orderBy?: DispositivoOrderByWithRelationInput | DispositivoOrderByWithRelationInput[]
    cursor?: DispositivoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DispositivoScalarFieldEnum | DispositivoScalarFieldEnum[]
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Dispositivo
   */

  export type AggregateDispositivo = {
    _count: DispositivoCountAggregateOutputType | null
    _avg: DispositivoAvgAggregateOutputType | null
    _sum: DispositivoSumAggregateOutputType | null
    _min: DispositivoMinAggregateOutputType | null
    _max: DispositivoMaxAggregateOutputType | null
  }

  export type DispositivoAvgAggregateOutputType = {
    counter: number | null
  }

  export type DispositivoSumAggregateOutputType = {
    counter: number | null
  }

  export type DispositivoMinAggregateOutputType = {
    id: string | null
    credentialId: string | null
    publicKey: string | null
    counter: number | null
    usuarioId: string | null
  }

  export type DispositivoMaxAggregateOutputType = {
    id: string | null
    credentialId: string | null
    publicKey: string | null
    counter: number | null
    usuarioId: string | null
  }

  export type DispositivoCountAggregateOutputType = {
    id: number
    credentialId: number
    publicKey: number
    counter: number
    usuarioId: number
    _all: number
  }


  export type DispositivoAvgAggregateInputType = {
    counter?: true
  }

  export type DispositivoSumAggregateInputType = {
    counter?: true
  }

  export type DispositivoMinAggregateInputType = {
    id?: true
    credentialId?: true
    publicKey?: true
    counter?: true
    usuarioId?: true
  }

  export type DispositivoMaxAggregateInputType = {
    id?: true
    credentialId?: true
    publicKey?: true
    counter?: true
    usuarioId?: true
  }

  export type DispositivoCountAggregateInputType = {
    id?: true
    credentialId?: true
    publicKey?: true
    counter?: true
    usuarioId?: true
    _all?: true
  }

  export type DispositivoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dispositivo to aggregate.
     */
    where?: DispositivoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dispositivos to fetch.
     */
    orderBy?: DispositivoOrderByWithRelationInput | DispositivoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DispositivoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dispositivos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dispositivos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Dispositivos
    **/
    _count?: true | DispositivoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DispositivoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DispositivoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DispositivoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DispositivoMaxAggregateInputType
  }

  export type GetDispositivoAggregateType<T extends DispositivoAggregateArgs> = {
        [P in keyof T & keyof AggregateDispositivo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDispositivo[P]>
      : GetScalarType<T[P], AggregateDispositivo[P]>
  }




  export type DispositivoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DispositivoWhereInput
    orderBy?: DispositivoOrderByWithAggregationInput | DispositivoOrderByWithAggregationInput[]
    by: DispositivoScalarFieldEnum[] | DispositivoScalarFieldEnum
    having?: DispositivoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DispositivoCountAggregateInputType | true
    _avg?: DispositivoAvgAggregateInputType
    _sum?: DispositivoSumAggregateInputType
    _min?: DispositivoMinAggregateInputType
    _max?: DispositivoMaxAggregateInputType
  }

  export type DispositivoGroupByOutputType = {
    id: string
    credentialId: string
    publicKey: string
    counter: number
    usuarioId: string
    _count: DispositivoCountAggregateOutputType | null
    _avg: DispositivoAvgAggregateOutputType | null
    _sum: DispositivoSumAggregateOutputType | null
    _min: DispositivoMinAggregateOutputType | null
    _max: DispositivoMaxAggregateOutputType | null
  }

  type GetDispositivoGroupByPayload<T extends DispositivoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DispositivoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DispositivoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DispositivoGroupByOutputType[P]>
            : GetScalarType<T[P], DispositivoGroupByOutputType[P]>
        }
      >
    >


  export type DispositivoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    credentialId?: boolean
    publicKey?: boolean
    counter?: boolean
    usuarioId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dispositivo"]>

  export type DispositivoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    credentialId?: boolean
    publicKey?: boolean
    counter?: boolean
    usuarioId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dispositivo"]>

  export type DispositivoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    credentialId?: boolean
    publicKey?: boolean
    counter?: boolean
    usuarioId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dispositivo"]>

  export type DispositivoSelectScalar = {
    id?: boolean
    credentialId?: boolean
    publicKey?: boolean
    counter?: boolean
    usuarioId?: boolean
  }

  export type DispositivoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "credentialId" | "publicKey" | "counter" | "usuarioId", ExtArgs["result"]["dispositivo"]>
  export type DispositivoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type DispositivoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type DispositivoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $DispositivoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Dispositivo"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      credentialId: string
      publicKey: string
      counter: number
      usuarioId: string
    }, ExtArgs["result"]["dispositivo"]>
    composites: {}
  }

  type DispositivoGetPayload<S extends boolean | null | undefined | DispositivoDefaultArgs> = $Result.GetResult<Prisma.$DispositivoPayload, S>

  type DispositivoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DispositivoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DispositivoCountAggregateInputType | true
    }

  export interface DispositivoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Dispositivo'], meta: { name: 'Dispositivo' } }
    /**
     * Find zero or one Dispositivo that matches the filter.
     * @param {DispositivoFindUniqueArgs} args - Arguments to find a Dispositivo
     * @example
     * // Get one Dispositivo
     * const dispositivo = await prisma.dispositivo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DispositivoFindUniqueArgs>(args: SelectSubset<T, DispositivoFindUniqueArgs<ExtArgs>>): Prisma__DispositivoClient<$Result.GetResult<Prisma.$DispositivoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Dispositivo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DispositivoFindUniqueOrThrowArgs} args - Arguments to find a Dispositivo
     * @example
     * // Get one Dispositivo
     * const dispositivo = await prisma.dispositivo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DispositivoFindUniqueOrThrowArgs>(args: SelectSubset<T, DispositivoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DispositivoClient<$Result.GetResult<Prisma.$DispositivoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dispositivo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DispositivoFindFirstArgs} args - Arguments to find a Dispositivo
     * @example
     * // Get one Dispositivo
     * const dispositivo = await prisma.dispositivo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DispositivoFindFirstArgs>(args?: SelectSubset<T, DispositivoFindFirstArgs<ExtArgs>>): Prisma__DispositivoClient<$Result.GetResult<Prisma.$DispositivoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dispositivo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DispositivoFindFirstOrThrowArgs} args - Arguments to find a Dispositivo
     * @example
     * // Get one Dispositivo
     * const dispositivo = await prisma.dispositivo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DispositivoFindFirstOrThrowArgs>(args?: SelectSubset<T, DispositivoFindFirstOrThrowArgs<ExtArgs>>): Prisma__DispositivoClient<$Result.GetResult<Prisma.$DispositivoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Dispositivos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DispositivoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dispositivos
     * const dispositivos = await prisma.dispositivo.findMany()
     * 
     * // Get first 10 Dispositivos
     * const dispositivos = await prisma.dispositivo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dispositivoWithIdOnly = await prisma.dispositivo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DispositivoFindManyArgs>(args?: SelectSubset<T, DispositivoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DispositivoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Dispositivo.
     * @param {DispositivoCreateArgs} args - Arguments to create a Dispositivo.
     * @example
     * // Create one Dispositivo
     * const Dispositivo = await prisma.dispositivo.create({
     *   data: {
     *     // ... data to create a Dispositivo
     *   }
     * })
     * 
     */
    create<T extends DispositivoCreateArgs>(args: SelectSubset<T, DispositivoCreateArgs<ExtArgs>>): Prisma__DispositivoClient<$Result.GetResult<Prisma.$DispositivoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Dispositivos.
     * @param {DispositivoCreateManyArgs} args - Arguments to create many Dispositivos.
     * @example
     * // Create many Dispositivos
     * const dispositivo = await prisma.dispositivo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DispositivoCreateManyArgs>(args?: SelectSubset<T, DispositivoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Dispositivos and returns the data saved in the database.
     * @param {DispositivoCreateManyAndReturnArgs} args - Arguments to create many Dispositivos.
     * @example
     * // Create many Dispositivos
     * const dispositivo = await prisma.dispositivo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Dispositivos and only return the `id`
     * const dispositivoWithIdOnly = await prisma.dispositivo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DispositivoCreateManyAndReturnArgs>(args?: SelectSubset<T, DispositivoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DispositivoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Dispositivo.
     * @param {DispositivoDeleteArgs} args - Arguments to delete one Dispositivo.
     * @example
     * // Delete one Dispositivo
     * const Dispositivo = await prisma.dispositivo.delete({
     *   where: {
     *     // ... filter to delete one Dispositivo
     *   }
     * })
     * 
     */
    delete<T extends DispositivoDeleteArgs>(args: SelectSubset<T, DispositivoDeleteArgs<ExtArgs>>): Prisma__DispositivoClient<$Result.GetResult<Prisma.$DispositivoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Dispositivo.
     * @param {DispositivoUpdateArgs} args - Arguments to update one Dispositivo.
     * @example
     * // Update one Dispositivo
     * const dispositivo = await prisma.dispositivo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DispositivoUpdateArgs>(args: SelectSubset<T, DispositivoUpdateArgs<ExtArgs>>): Prisma__DispositivoClient<$Result.GetResult<Prisma.$DispositivoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Dispositivos.
     * @param {DispositivoDeleteManyArgs} args - Arguments to filter Dispositivos to delete.
     * @example
     * // Delete a few Dispositivos
     * const { count } = await prisma.dispositivo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DispositivoDeleteManyArgs>(args?: SelectSubset<T, DispositivoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dispositivos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DispositivoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dispositivos
     * const dispositivo = await prisma.dispositivo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DispositivoUpdateManyArgs>(args: SelectSubset<T, DispositivoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dispositivos and returns the data updated in the database.
     * @param {DispositivoUpdateManyAndReturnArgs} args - Arguments to update many Dispositivos.
     * @example
     * // Update many Dispositivos
     * const dispositivo = await prisma.dispositivo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Dispositivos and only return the `id`
     * const dispositivoWithIdOnly = await prisma.dispositivo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DispositivoUpdateManyAndReturnArgs>(args: SelectSubset<T, DispositivoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DispositivoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Dispositivo.
     * @param {DispositivoUpsertArgs} args - Arguments to update or create a Dispositivo.
     * @example
     * // Update or create a Dispositivo
     * const dispositivo = await prisma.dispositivo.upsert({
     *   create: {
     *     // ... data to create a Dispositivo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dispositivo we want to update
     *   }
     * })
     */
    upsert<T extends DispositivoUpsertArgs>(args: SelectSubset<T, DispositivoUpsertArgs<ExtArgs>>): Prisma__DispositivoClient<$Result.GetResult<Prisma.$DispositivoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Dispositivos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DispositivoCountArgs} args - Arguments to filter Dispositivos to count.
     * @example
     * // Count the number of Dispositivos
     * const count = await prisma.dispositivo.count({
     *   where: {
     *     // ... the filter for the Dispositivos we want to count
     *   }
     * })
    **/
    count<T extends DispositivoCountArgs>(
      args?: Subset<T, DispositivoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DispositivoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dispositivo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DispositivoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DispositivoAggregateArgs>(args: Subset<T, DispositivoAggregateArgs>): Prisma.PrismaPromise<GetDispositivoAggregateType<T>>

    /**
     * Group by Dispositivo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DispositivoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DispositivoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DispositivoGroupByArgs['orderBy'] }
        : { orderBy?: DispositivoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DispositivoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDispositivoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Dispositivo model
   */
  readonly fields: DispositivoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Dispositivo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DispositivoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Dispositivo model
   */
  interface DispositivoFieldRefs {
    readonly id: FieldRef<"Dispositivo", 'String'>
    readonly credentialId: FieldRef<"Dispositivo", 'String'>
    readonly publicKey: FieldRef<"Dispositivo", 'String'>
    readonly counter: FieldRef<"Dispositivo", 'Int'>
    readonly usuarioId: FieldRef<"Dispositivo", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Dispositivo findUnique
   */
  export type DispositivoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispositivo
     */
    select?: DispositivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispositivo
     */
    omit?: DispositivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DispositivoInclude<ExtArgs> | null
    /**
     * Filter, which Dispositivo to fetch.
     */
    where: DispositivoWhereUniqueInput
  }

  /**
   * Dispositivo findUniqueOrThrow
   */
  export type DispositivoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispositivo
     */
    select?: DispositivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispositivo
     */
    omit?: DispositivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DispositivoInclude<ExtArgs> | null
    /**
     * Filter, which Dispositivo to fetch.
     */
    where: DispositivoWhereUniqueInput
  }

  /**
   * Dispositivo findFirst
   */
  export type DispositivoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispositivo
     */
    select?: DispositivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispositivo
     */
    omit?: DispositivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DispositivoInclude<ExtArgs> | null
    /**
     * Filter, which Dispositivo to fetch.
     */
    where?: DispositivoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dispositivos to fetch.
     */
    orderBy?: DispositivoOrderByWithRelationInput | DispositivoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dispositivos.
     */
    cursor?: DispositivoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dispositivos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dispositivos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dispositivos.
     */
    distinct?: DispositivoScalarFieldEnum | DispositivoScalarFieldEnum[]
  }

  /**
   * Dispositivo findFirstOrThrow
   */
  export type DispositivoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispositivo
     */
    select?: DispositivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispositivo
     */
    omit?: DispositivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DispositivoInclude<ExtArgs> | null
    /**
     * Filter, which Dispositivo to fetch.
     */
    where?: DispositivoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dispositivos to fetch.
     */
    orderBy?: DispositivoOrderByWithRelationInput | DispositivoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dispositivos.
     */
    cursor?: DispositivoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dispositivos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dispositivos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dispositivos.
     */
    distinct?: DispositivoScalarFieldEnum | DispositivoScalarFieldEnum[]
  }

  /**
   * Dispositivo findMany
   */
  export type DispositivoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispositivo
     */
    select?: DispositivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispositivo
     */
    omit?: DispositivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DispositivoInclude<ExtArgs> | null
    /**
     * Filter, which Dispositivos to fetch.
     */
    where?: DispositivoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dispositivos to fetch.
     */
    orderBy?: DispositivoOrderByWithRelationInput | DispositivoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Dispositivos.
     */
    cursor?: DispositivoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dispositivos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dispositivos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dispositivos.
     */
    distinct?: DispositivoScalarFieldEnum | DispositivoScalarFieldEnum[]
  }

  /**
   * Dispositivo create
   */
  export type DispositivoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispositivo
     */
    select?: DispositivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispositivo
     */
    omit?: DispositivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DispositivoInclude<ExtArgs> | null
    /**
     * The data needed to create a Dispositivo.
     */
    data: XOR<DispositivoCreateInput, DispositivoUncheckedCreateInput>
  }

  /**
   * Dispositivo createMany
   */
  export type DispositivoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Dispositivos.
     */
    data: DispositivoCreateManyInput | DispositivoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Dispositivo createManyAndReturn
   */
  export type DispositivoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispositivo
     */
    select?: DispositivoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Dispositivo
     */
    omit?: DispositivoOmit<ExtArgs> | null
    /**
     * The data used to create many Dispositivos.
     */
    data: DispositivoCreateManyInput | DispositivoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DispositivoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Dispositivo update
   */
  export type DispositivoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispositivo
     */
    select?: DispositivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispositivo
     */
    omit?: DispositivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DispositivoInclude<ExtArgs> | null
    /**
     * The data needed to update a Dispositivo.
     */
    data: XOR<DispositivoUpdateInput, DispositivoUncheckedUpdateInput>
    /**
     * Choose, which Dispositivo to update.
     */
    where: DispositivoWhereUniqueInput
  }

  /**
   * Dispositivo updateMany
   */
  export type DispositivoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Dispositivos.
     */
    data: XOR<DispositivoUpdateManyMutationInput, DispositivoUncheckedUpdateManyInput>
    /**
     * Filter which Dispositivos to update
     */
    where?: DispositivoWhereInput
    /**
     * Limit how many Dispositivos to update.
     */
    limit?: number
  }

  /**
   * Dispositivo updateManyAndReturn
   */
  export type DispositivoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispositivo
     */
    select?: DispositivoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Dispositivo
     */
    omit?: DispositivoOmit<ExtArgs> | null
    /**
     * The data used to update Dispositivos.
     */
    data: XOR<DispositivoUpdateManyMutationInput, DispositivoUncheckedUpdateManyInput>
    /**
     * Filter which Dispositivos to update
     */
    where?: DispositivoWhereInput
    /**
     * Limit how many Dispositivos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DispositivoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Dispositivo upsert
   */
  export type DispositivoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispositivo
     */
    select?: DispositivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispositivo
     */
    omit?: DispositivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DispositivoInclude<ExtArgs> | null
    /**
     * The filter to search for the Dispositivo to update in case it exists.
     */
    where: DispositivoWhereUniqueInput
    /**
     * In case the Dispositivo found by the `where` argument doesn't exist, create a new Dispositivo with this data.
     */
    create: XOR<DispositivoCreateInput, DispositivoUncheckedCreateInput>
    /**
     * In case the Dispositivo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DispositivoUpdateInput, DispositivoUncheckedUpdateInput>
  }

  /**
   * Dispositivo delete
   */
  export type DispositivoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispositivo
     */
    select?: DispositivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispositivo
     */
    omit?: DispositivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DispositivoInclude<ExtArgs> | null
    /**
     * Filter which Dispositivo to delete.
     */
    where: DispositivoWhereUniqueInput
  }

  /**
   * Dispositivo deleteMany
   */
  export type DispositivoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dispositivos to delete
     */
    where?: DispositivoWhereInput
    /**
     * Limit how many Dispositivos to delete.
     */
    limit?: number
  }

  /**
   * Dispositivo without action
   */
  export type DispositivoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispositivo
     */
    select?: DispositivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispositivo
     */
    omit?: DispositivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DispositivoInclude<ExtArgs> | null
  }


  /**
   * Model MediaResource
   */

  export type AggregateMediaResource = {
    _count: MediaResourceCountAggregateOutputType | null
    _min: MediaResourceMinAggregateOutputType | null
    _max: MediaResourceMaxAggregateOutputType | null
  }

  export type MediaResourceMinAggregateOutputType = {
    id: string | null
    imagenPrincipalUrl: string | null
    nombre: string | null
    descripcion: string | null
    instituto: string | null
    miniaturaUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MediaResourceMaxAggregateOutputType = {
    id: string | null
    imagenPrincipalUrl: string | null
    nombre: string | null
    descripcion: string | null
    instituto: string | null
    miniaturaUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MediaResourceCountAggregateOutputType = {
    id: number
    imagenPrincipalUrl: number
    nombre: number
    descripcion: number
    instituto: number
    miniaturaUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MediaResourceMinAggregateInputType = {
    id?: true
    imagenPrincipalUrl?: true
    nombre?: true
    descripcion?: true
    instituto?: true
    miniaturaUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MediaResourceMaxAggregateInputType = {
    id?: true
    imagenPrincipalUrl?: true
    nombre?: true
    descripcion?: true
    instituto?: true
    miniaturaUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MediaResourceCountAggregateInputType = {
    id?: true
    imagenPrincipalUrl?: true
    nombre?: true
    descripcion?: true
    instituto?: true
    miniaturaUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MediaResourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaResource to aggregate.
     */
    where?: MediaResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaResources to fetch.
     */
    orderBy?: MediaResourceOrderByWithRelationInput | MediaResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MediaResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaResources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaResources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MediaResources
    **/
    _count?: true | MediaResourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediaResourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediaResourceMaxAggregateInputType
  }

  export type GetMediaResourceAggregateType<T extends MediaResourceAggregateArgs> = {
        [P in keyof T & keyof AggregateMediaResource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMediaResource[P]>
      : GetScalarType<T[P], AggregateMediaResource[P]>
  }




  export type MediaResourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaResourceWhereInput
    orderBy?: MediaResourceOrderByWithAggregationInput | MediaResourceOrderByWithAggregationInput[]
    by: MediaResourceScalarFieldEnum[] | MediaResourceScalarFieldEnum
    having?: MediaResourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediaResourceCountAggregateInputType | true
    _min?: MediaResourceMinAggregateInputType
    _max?: MediaResourceMaxAggregateInputType
  }

  export type MediaResourceGroupByOutputType = {
    id: string
    imagenPrincipalUrl: string
    nombre: string
    descripcion: string
    instituto: string | null
    miniaturaUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: MediaResourceCountAggregateOutputType | null
    _min: MediaResourceMinAggregateOutputType | null
    _max: MediaResourceMaxAggregateOutputType | null
  }

  type GetMediaResourceGroupByPayload<T extends MediaResourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediaResourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediaResourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediaResourceGroupByOutputType[P]>
            : GetScalarType<T[P], MediaResourceGroupByOutputType[P]>
        }
      >
    >


  export type MediaResourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imagenPrincipalUrl?: boolean
    nombre?: boolean
    descripcion?: boolean
    instituto?: boolean
    miniaturaUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categorias?: boolean | MediaResource$categoriasArgs<ExtArgs>
    enlaces?: boolean | MediaResource$enlacesArgs<ExtArgs>
    vinetas?: boolean | MediaResource$vinetasArgs<ExtArgs>
    _count?: boolean | MediaResourceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mediaResource"]>

  export type MediaResourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imagenPrincipalUrl?: boolean
    nombre?: boolean
    descripcion?: boolean
    instituto?: boolean
    miniaturaUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mediaResource"]>

  export type MediaResourceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imagenPrincipalUrl?: boolean
    nombre?: boolean
    descripcion?: boolean
    instituto?: boolean
    miniaturaUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mediaResource"]>

  export type MediaResourceSelectScalar = {
    id?: boolean
    imagenPrincipalUrl?: boolean
    nombre?: boolean
    descripcion?: boolean
    instituto?: boolean
    miniaturaUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MediaResourceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "imagenPrincipalUrl" | "nombre" | "descripcion" | "instituto" | "miniaturaUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["mediaResource"]>
  export type MediaResourceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categorias?: boolean | MediaResource$categoriasArgs<ExtArgs>
    enlaces?: boolean | MediaResource$enlacesArgs<ExtArgs>
    vinetas?: boolean | MediaResource$vinetasArgs<ExtArgs>
    _count?: boolean | MediaResourceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MediaResourceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MediaResourceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MediaResourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MediaResource"
    objects: {
      categorias: Prisma.$CategoriaPayload<ExtArgs>[]
      enlaces: Prisma.$EnlacePayload<ExtArgs>[]
      vinetas: Prisma.$VinetaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      imagenPrincipalUrl: string
      nombre: string
      descripcion: string
      instituto: string | null
      miniaturaUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mediaResource"]>
    composites: {}
  }

  type MediaResourceGetPayload<S extends boolean | null | undefined | MediaResourceDefaultArgs> = $Result.GetResult<Prisma.$MediaResourcePayload, S>

  type MediaResourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MediaResourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MediaResourceCountAggregateInputType | true
    }

  export interface MediaResourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MediaResource'], meta: { name: 'MediaResource' } }
    /**
     * Find zero or one MediaResource that matches the filter.
     * @param {MediaResourceFindUniqueArgs} args - Arguments to find a MediaResource
     * @example
     * // Get one MediaResource
     * const mediaResource = await prisma.mediaResource.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MediaResourceFindUniqueArgs>(args: SelectSubset<T, MediaResourceFindUniqueArgs<ExtArgs>>): Prisma__MediaResourceClient<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MediaResource that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MediaResourceFindUniqueOrThrowArgs} args - Arguments to find a MediaResource
     * @example
     * // Get one MediaResource
     * const mediaResource = await prisma.mediaResource.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MediaResourceFindUniqueOrThrowArgs>(args: SelectSubset<T, MediaResourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MediaResourceClient<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaResource that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaResourceFindFirstArgs} args - Arguments to find a MediaResource
     * @example
     * // Get one MediaResource
     * const mediaResource = await prisma.mediaResource.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MediaResourceFindFirstArgs>(args?: SelectSubset<T, MediaResourceFindFirstArgs<ExtArgs>>): Prisma__MediaResourceClient<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaResource that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaResourceFindFirstOrThrowArgs} args - Arguments to find a MediaResource
     * @example
     * // Get one MediaResource
     * const mediaResource = await prisma.mediaResource.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MediaResourceFindFirstOrThrowArgs>(args?: SelectSubset<T, MediaResourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__MediaResourceClient<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MediaResources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaResourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MediaResources
     * const mediaResources = await prisma.mediaResource.findMany()
     * 
     * // Get first 10 MediaResources
     * const mediaResources = await prisma.mediaResource.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mediaResourceWithIdOnly = await prisma.mediaResource.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MediaResourceFindManyArgs>(args?: SelectSubset<T, MediaResourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MediaResource.
     * @param {MediaResourceCreateArgs} args - Arguments to create a MediaResource.
     * @example
     * // Create one MediaResource
     * const MediaResource = await prisma.mediaResource.create({
     *   data: {
     *     // ... data to create a MediaResource
     *   }
     * })
     * 
     */
    create<T extends MediaResourceCreateArgs>(args: SelectSubset<T, MediaResourceCreateArgs<ExtArgs>>): Prisma__MediaResourceClient<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MediaResources.
     * @param {MediaResourceCreateManyArgs} args - Arguments to create many MediaResources.
     * @example
     * // Create many MediaResources
     * const mediaResource = await prisma.mediaResource.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MediaResourceCreateManyArgs>(args?: SelectSubset<T, MediaResourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MediaResources and returns the data saved in the database.
     * @param {MediaResourceCreateManyAndReturnArgs} args - Arguments to create many MediaResources.
     * @example
     * // Create many MediaResources
     * const mediaResource = await prisma.mediaResource.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MediaResources and only return the `id`
     * const mediaResourceWithIdOnly = await prisma.mediaResource.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MediaResourceCreateManyAndReturnArgs>(args?: SelectSubset<T, MediaResourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MediaResource.
     * @param {MediaResourceDeleteArgs} args - Arguments to delete one MediaResource.
     * @example
     * // Delete one MediaResource
     * const MediaResource = await prisma.mediaResource.delete({
     *   where: {
     *     // ... filter to delete one MediaResource
     *   }
     * })
     * 
     */
    delete<T extends MediaResourceDeleteArgs>(args: SelectSubset<T, MediaResourceDeleteArgs<ExtArgs>>): Prisma__MediaResourceClient<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MediaResource.
     * @param {MediaResourceUpdateArgs} args - Arguments to update one MediaResource.
     * @example
     * // Update one MediaResource
     * const mediaResource = await prisma.mediaResource.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MediaResourceUpdateArgs>(args: SelectSubset<T, MediaResourceUpdateArgs<ExtArgs>>): Prisma__MediaResourceClient<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MediaResources.
     * @param {MediaResourceDeleteManyArgs} args - Arguments to filter MediaResources to delete.
     * @example
     * // Delete a few MediaResources
     * const { count } = await prisma.mediaResource.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MediaResourceDeleteManyArgs>(args?: SelectSubset<T, MediaResourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaResources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaResourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MediaResources
     * const mediaResource = await prisma.mediaResource.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MediaResourceUpdateManyArgs>(args: SelectSubset<T, MediaResourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaResources and returns the data updated in the database.
     * @param {MediaResourceUpdateManyAndReturnArgs} args - Arguments to update many MediaResources.
     * @example
     * // Update many MediaResources
     * const mediaResource = await prisma.mediaResource.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MediaResources and only return the `id`
     * const mediaResourceWithIdOnly = await prisma.mediaResource.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MediaResourceUpdateManyAndReturnArgs>(args: SelectSubset<T, MediaResourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MediaResource.
     * @param {MediaResourceUpsertArgs} args - Arguments to update or create a MediaResource.
     * @example
     * // Update or create a MediaResource
     * const mediaResource = await prisma.mediaResource.upsert({
     *   create: {
     *     // ... data to create a MediaResource
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MediaResource we want to update
     *   }
     * })
     */
    upsert<T extends MediaResourceUpsertArgs>(args: SelectSubset<T, MediaResourceUpsertArgs<ExtArgs>>): Prisma__MediaResourceClient<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MediaResources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaResourceCountArgs} args - Arguments to filter MediaResources to count.
     * @example
     * // Count the number of MediaResources
     * const count = await prisma.mediaResource.count({
     *   where: {
     *     // ... the filter for the MediaResources we want to count
     *   }
     * })
    **/
    count<T extends MediaResourceCountArgs>(
      args?: Subset<T, MediaResourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediaResourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MediaResource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaResourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MediaResourceAggregateArgs>(args: Subset<T, MediaResourceAggregateArgs>): Prisma.PrismaPromise<GetMediaResourceAggregateType<T>>

    /**
     * Group by MediaResource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaResourceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MediaResourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MediaResourceGroupByArgs['orderBy'] }
        : { orderBy?: MediaResourceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MediaResourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaResourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MediaResource model
   */
  readonly fields: MediaResourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MediaResource.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MediaResourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    categorias<T extends MediaResource$categoriasArgs<ExtArgs> = {}>(args?: Subset<T, MediaResource$categoriasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    enlaces<T extends MediaResource$enlacesArgs<ExtArgs> = {}>(args?: Subset<T, MediaResource$enlacesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnlacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    vinetas<T extends MediaResource$vinetasArgs<ExtArgs> = {}>(args?: Subset<T, MediaResource$vinetasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VinetaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MediaResource model
   */
  interface MediaResourceFieldRefs {
    readonly id: FieldRef<"MediaResource", 'String'>
    readonly imagenPrincipalUrl: FieldRef<"MediaResource", 'String'>
    readonly nombre: FieldRef<"MediaResource", 'String'>
    readonly descripcion: FieldRef<"MediaResource", 'String'>
    readonly instituto: FieldRef<"MediaResource", 'String'>
    readonly miniaturaUrl: FieldRef<"MediaResource", 'String'>
    readonly createdAt: FieldRef<"MediaResource", 'DateTime'>
    readonly updatedAt: FieldRef<"MediaResource", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MediaResource findUnique
   */
  export type MediaResourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaResourceInclude<ExtArgs> | null
    /**
     * Filter, which MediaResource to fetch.
     */
    where: MediaResourceWhereUniqueInput
  }

  /**
   * MediaResource findUniqueOrThrow
   */
  export type MediaResourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaResourceInclude<ExtArgs> | null
    /**
     * Filter, which MediaResource to fetch.
     */
    where: MediaResourceWhereUniqueInput
  }

  /**
   * MediaResource findFirst
   */
  export type MediaResourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaResourceInclude<ExtArgs> | null
    /**
     * Filter, which MediaResource to fetch.
     */
    where?: MediaResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaResources to fetch.
     */
    orderBy?: MediaResourceOrderByWithRelationInput | MediaResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaResources.
     */
    cursor?: MediaResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaResources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaResources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaResources.
     */
    distinct?: MediaResourceScalarFieldEnum | MediaResourceScalarFieldEnum[]
  }

  /**
   * MediaResource findFirstOrThrow
   */
  export type MediaResourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaResourceInclude<ExtArgs> | null
    /**
     * Filter, which MediaResource to fetch.
     */
    where?: MediaResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaResources to fetch.
     */
    orderBy?: MediaResourceOrderByWithRelationInput | MediaResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaResources.
     */
    cursor?: MediaResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaResources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaResources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaResources.
     */
    distinct?: MediaResourceScalarFieldEnum | MediaResourceScalarFieldEnum[]
  }

  /**
   * MediaResource findMany
   */
  export type MediaResourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaResourceInclude<ExtArgs> | null
    /**
     * Filter, which MediaResources to fetch.
     */
    where?: MediaResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaResources to fetch.
     */
    orderBy?: MediaResourceOrderByWithRelationInput | MediaResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MediaResources.
     */
    cursor?: MediaResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaResources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaResources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaResources.
     */
    distinct?: MediaResourceScalarFieldEnum | MediaResourceScalarFieldEnum[]
  }

  /**
   * MediaResource create
   */
  export type MediaResourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaResourceInclude<ExtArgs> | null
    /**
     * The data needed to create a MediaResource.
     */
    data: XOR<MediaResourceCreateInput, MediaResourceUncheckedCreateInput>
  }

  /**
   * MediaResource createMany
   */
  export type MediaResourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MediaResources.
     */
    data: MediaResourceCreateManyInput | MediaResourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MediaResource createManyAndReturn
   */
  export type MediaResourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * The data used to create many MediaResources.
     */
    data: MediaResourceCreateManyInput | MediaResourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MediaResource update
   */
  export type MediaResourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaResourceInclude<ExtArgs> | null
    /**
     * The data needed to update a MediaResource.
     */
    data: XOR<MediaResourceUpdateInput, MediaResourceUncheckedUpdateInput>
    /**
     * Choose, which MediaResource to update.
     */
    where: MediaResourceWhereUniqueInput
  }

  /**
   * MediaResource updateMany
   */
  export type MediaResourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MediaResources.
     */
    data: XOR<MediaResourceUpdateManyMutationInput, MediaResourceUncheckedUpdateManyInput>
    /**
     * Filter which MediaResources to update
     */
    where?: MediaResourceWhereInput
    /**
     * Limit how many MediaResources to update.
     */
    limit?: number
  }

  /**
   * MediaResource updateManyAndReturn
   */
  export type MediaResourceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * The data used to update MediaResources.
     */
    data: XOR<MediaResourceUpdateManyMutationInput, MediaResourceUncheckedUpdateManyInput>
    /**
     * Filter which MediaResources to update
     */
    where?: MediaResourceWhereInput
    /**
     * Limit how many MediaResources to update.
     */
    limit?: number
  }

  /**
   * MediaResource upsert
   */
  export type MediaResourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaResourceInclude<ExtArgs> | null
    /**
     * The filter to search for the MediaResource to update in case it exists.
     */
    where: MediaResourceWhereUniqueInput
    /**
     * In case the MediaResource found by the `where` argument doesn't exist, create a new MediaResource with this data.
     */
    create: XOR<MediaResourceCreateInput, MediaResourceUncheckedCreateInput>
    /**
     * In case the MediaResource was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MediaResourceUpdateInput, MediaResourceUncheckedUpdateInput>
  }

  /**
   * MediaResource delete
   */
  export type MediaResourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaResourceInclude<ExtArgs> | null
    /**
     * Filter which MediaResource to delete.
     */
    where: MediaResourceWhereUniqueInput
  }

  /**
   * MediaResource deleteMany
   */
  export type MediaResourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaResources to delete
     */
    where?: MediaResourceWhereInput
    /**
     * Limit how many MediaResources to delete.
     */
    limit?: number
  }

  /**
   * MediaResource.categorias
   */
  export type MediaResource$categoriasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    where?: CategoriaWhereInput
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    cursor?: CategoriaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * MediaResource.enlaces
   */
  export type MediaResource$enlacesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enlace
     */
    select?: EnlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enlace
     */
    omit?: EnlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnlaceInclude<ExtArgs> | null
    where?: EnlaceWhereInput
    orderBy?: EnlaceOrderByWithRelationInput | EnlaceOrderByWithRelationInput[]
    cursor?: EnlaceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnlaceScalarFieldEnum | EnlaceScalarFieldEnum[]
  }

  /**
   * MediaResource.vinetas
   */
  export type MediaResource$vinetasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vineta
     */
    select?: VinetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vineta
     */
    omit?: VinetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinetaInclude<ExtArgs> | null
    where?: VinetaWhereInput
    orderBy?: VinetaOrderByWithRelationInput | VinetaOrderByWithRelationInput[]
    cursor?: VinetaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VinetaScalarFieldEnum | VinetaScalarFieldEnum[]
  }

  /**
   * MediaResource without action
   */
  export type MediaResourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaResourceInclude<ExtArgs> | null
  }


  /**
   * Model Categoria
   */

  export type AggregateCategoria = {
    _count: CategoriaCountAggregateOutputType | null
    _min: CategoriaMinAggregateOutputType | null
    _max: CategoriaMaxAggregateOutputType | null
  }

  export type CategoriaMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    mediaResourceId: string | null
  }

  export type CategoriaMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    mediaResourceId: string | null
  }

  export type CategoriaCountAggregateOutputType = {
    id: number
    nombre: number
    mediaResourceId: number
    _all: number
  }


  export type CategoriaMinAggregateInputType = {
    id?: true
    nombre?: true
    mediaResourceId?: true
  }

  export type CategoriaMaxAggregateInputType = {
    id?: true
    nombre?: true
    mediaResourceId?: true
  }

  export type CategoriaCountAggregateInputType = {
    id?: true
    nombre?: true
    mediaResourceId?: true
    _all?: true
  }

  export type CategoriaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categoria to aggregate.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categorias
    **/
    _count?: true | CategoriaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoriaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoriaMaxAggregateInputType
  }

  export type GetCategoriaAggregateType<T extends CategoriaAggregateArgs> = {
        [P in keyof T & keyof AggregateCategoria]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategoria[P]>
      : GetScalarType<T[P], AggregateCategoria[P]>
  }




  export type CategoriaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoriaWhereInput
    orderBy?: CategoriaOrderByWithAggregationInput | CategoriaOrderByWithAggregationInput[]
    by: CategoriaScalarFieldEnum[] | CategoriaScalarFieldEnum
    having?: CategoriaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoriaCountAggregateInputType | true
    _min?: CategoriaMinAggregateInputType
    _max?: CategoriaMaxAggregateInputType
  }

  export type CategoriaGroupByOutputType = {
    id: string
    nombre: string
    mediaResourceId: string
    _count: CategoriaCountAggregateOutputType | null
    _min: CategoriaMinAggregateOutputType | null
    _max: CategoriaMaxAggregateOutputType | null
  }

  type GetCategoriaGroupByPayload<T extends CategoriaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoriaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoriaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoriaGroupByOutputType[P]>
            : GetScalarType<T[P], CategoriaGroupByOutputType[P]>
        }
      >
    >


  export type CategoriaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    mediaResourceId?: boolean
    mediaResource?: boolean | MediaResourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    mediaResourceId?: boolean
    mediaResource?: boolean | MediaResourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    mediaResourceId?: boolean
    mediaResource?: boolean | MediaResourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectScalar = {
    id?: boolean
    nombre?: boolean
    mediaResourceId?: boolean
  }

  export type CategoriaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "mediaResourceId", ExtArgs["result"]["categoria"]>
  export type CategoriaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mediaResource?: boolean | MediaResourceDefaultArgs<ExtArgs>
  }
  export type CategoriaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mediaResource?: boolean | MediaResourceDefaultArgs<ExtArgs>
  }
  export type CategoriaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mediaResource?: boolean | MediaResourceDefaultArgs<ExtArgs>
  }

  export type $CategoriaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Categoria"
    objects: {
      mediaResource: Prisma.$MediaResourcePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      mediaResourceId: string
    }, ExtArgs["result"]["categoria"]>
    composites: {}
  }

  type CategoriaGetPayload<S extends boolean | null | undefined | CategoriaDefaultArgs> = $Result.GetResult<Prisma.$CategoriaPayload, S>

  type CategoriaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoriaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoriaCountAggregateInputType | true
    }

  export interface CategoriaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Categoria'], meta: { name: 'Categoria' } }
    /**
     * Find zero or one Categoria that matches the filter.
     * @param {CategoriaFindUniqueArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoriaFindUniqueArgs>(args: SelectSubset<T, CategoriaFindUniqueArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Categoria that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoriaFindUniqueOrThrowArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoriaFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoriaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categoria that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindFirstArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoriaFindFirstArgs>(args?: SelectSubset<T, CategoriaFindFirstArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categoria that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindFirstOrThrowArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoriaFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoriaFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categorias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categorias
     * const categorias = await prisma.categoria.findMany()
     * 
     * // Get first 10 Categorias
     * const categorias = await prisma.categoria.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoriaWithIdOnly = await prisma.categoria.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoriaFindManyArgs>(args?: SelectSubset<T, CategoriaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Categoria.
     * @param {CategoriaCreateArgs} args - Arguments to create a Categoria.
     * @example
     * // Create one Categoria
     * const Categoria = await prisma.categoria.create({
     *   data: {
     *     // ... data to create a Categoria
     *   }
     * })
     * 
     */
    create<T extends CategoriaCreateArgs>(args: SelectSubset<T, CategoriaCreateArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categorias.
     * @param {CategoriaCreateManyArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categoria = await prisma.categoria.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoriaCreateManyArgs>(args?: SelectSubset<T, CategoriaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categorias and returns the data saved in the database.
     * @param {CategoriaCreateManyAndReturnArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categoria = await prisma.categoria.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categorias and only return the `id`
     * const categoriaWithIdOnly = await prisma.categoria.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoriaCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoriaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Categoria.
     * @param {CategoriaDeleteArgs} args - Arguments to delete one Categoria.
     * @example
     * // Delete one Categoria
     * const Categoria = await prisma.categoria.delete({
     *   where: {
     *     // ... filter to delete one Categoria
     *   }
     * })
     * 
     */
    delete<T extends CategoriaDeleteArgs>(args: SelectSubset<T, CategoriaDeleteArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Categoria.
     * @param {CategoriaUpdateArgs} args - Arguments to update one Categoria.
     * @example
     * // Update one Categoria
     * const categoria = await prisma.categoria.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoriaUpdateArgs>(args: SelectSubset<T, CategoriaUpdateArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categorias.
     * @param {CategoriaDeleteManyArgs} args - Arguments to filter Categorias to delete.
     * @example
     * // Delete a few Categorias
     * const { count } = await prisma.categoria.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoriaDeleteManyArgs>(args?: SelectSubset<T, CategoriaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categorias
     * const categoria = await prisma.categoria.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoriaUpdateManyArgs>(args: SelectSubset<T, CategoriaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categorias and returns the data updated in the database.
     * @param {CategoriaUpdateManyAndReturnArgs} args - Arguments to update many Categorias.
     * @example
     * // Update many Categorias
     * const categoria = await prisma.categoria.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categorias and only return the `id`
     * const categoriaWithIdOnly = await prisma.categoria.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoriaUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoriaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Categoria.
     * @param {CategoriaUpsertArgs} args - Arguments to update or create a Categoria.
     * @example
     * // Update or create a Categoria
     * const categoria = await prisma.categoria.upsert({
     *   create: {
     *     // ... data to create a Categoria
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categoria we want to update
     *   }
     * })
     */
    upsert<T extends CategoriaUpsertArgs>(args: SelectSubset<T, CategoriaUpsertArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaCountArgs} args - Arguments to filter Categorias to count.
     * @example
     * // Count the number of Categorias
     * const count = await prisma.categoria.count({
     *   where: {
     *     // ... the filter for the Categorias we want to count
     *   }
     * })
    **/
    count<T extends CategoriaCountArgs>(
      args?: Subset<T, CategoriaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoriaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoriaAggregateArgs>(args: Subset<T, CategoriaAggregateArgs>): Prisma.PrismaPromise<GetCategoriaAggregateType<T>>

    /**
     * Group by Categoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoriaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoriaGroupByArgs['orderBy'] }
        : { orderBy?: CategoriaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoriaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoriaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Categoria model
   */
  readonly fields: CategoriaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Categoria.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoriaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mediaResource<T extends MediaResourceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MediaResourceDefaultArgs<ExtArgs>>): Prisma__MediaResourceClient<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Categoria model
   */
  interface CategoriaFieldRefs {
    readonly id: FieldRef<"Categoria", 'String'>
    readonly nombre: FieldRef<"Categoria", 'String'>
    readonly mediaResourceId: FieldRef<"Categoria", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Categoria findUnique
   */
  export type CategoriaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria findUniqueOrThrow
   */
  export type CategoriaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria findFirst
   */
  export type CategoriaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria findFirstOrThrow
   */
  export type CategoriaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria findMany
   */
  export type CategoriaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categorias to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria create
   */
  export type CategoriaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The data needed to create a Categoria.
     */
    data: XOR<CategoriaCreateInput, CategoriaUncheckedCreateInput>
  }

  /**
   * Categoria createMany
   */
  export type CategoriaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categorias.
     */
    data: CategoriaCreateManyInput | CategoriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Categoria createManyAndReturn
   */
  export type CategoriaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * The data used to create many Categorias.
     */
    data: CategoriaCreateManyInput | CategoriaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Categoria update
   */
  export type CategoriaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The data needed to update a Categoria.
     */
    data: XOR<CategoriaUpdateInput, CategoriaUncheckedUpdateInput>
    /**
     * Choose, which Categoria to update.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria updateMany
   */
  export type CategoriaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categorias.
     */
    data: XOR<CategoriaUpdateManyMutationInput, CategoriaUncheckedUpdateManyInput>
    /**
     * Filter which Categorias to update
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to update.
     */
    limit?: number
  }

  /**
   * Categoria updateManyAndReturn
   */
  export type CategoriaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * The data used to update Categorias.
     */
    data: XOR<CategoriaUpdateManyMutationInput, CategoriaUncheckedUpdateManyInput>
    /**
     * Filter which Categorias to update
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Categoria upsert
   */
  export type CategoriaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The filter to search for the Categoria to update in case it exists.
     */
    where: CategoriaWhereUniqueInput
    /**
     * In case the Categoria found by the `where` argument doesn't exist, create a new Categoria with this data.
     */
    create: XOR<CategoriaCreateInput, CategoriaUncheckedCreateInput>
    /**
     * In case the Categoria was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoriaUpdateInput, CategoriaUncheckedUpdateInput>
  }

  /**
   * Categoria delete
   */
  export type CategoriaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter which Categoria to delete.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria deleteMany
   */
  export type CategoriaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categorias to delete
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to delete.
     */
    limit?: number
  }

  /**
   * Categoria without action
   */
  export type CategoriaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
  }


  /**
   * Model Enlace
   */

  export type AggregateEnlace = {
    _count: EnlaceCountAggregateOutputType | null
    _min: EnlaceMinAggregateOutputType | null
    _max: EnlaceMaxAggregateOutputType | null
  }

  export type EnlaceMinAggregateOutputType = {
    id: string | null
    tipo: string | null
    url: string | null
    mediaResourceId: string | null
  }

  export type EnlaceMaxAggregateOutputType = {
    id: string | null
    tipo: string | null
    url: string | null
    mediaResourceId: string | null
  }

  export type EnlaceCountAggregateOutputType = {
    id: number
    tipo: number
    url: number
    mediaResourceId: number
    _all: number
  }


  export type EnlaceMinAggregateInputType = {
    id?: true
    tipo?: true
    url?: true
    mediaResourceId?: true
  }

  export type EnlaceMaxAggregateInputType = {
    id?: true
    tipo?: true
    url?: true
    mediaResourceId?: true
  }

  export type EnlaceCountAggregateInputType = {
    id?: true
    tipo?: true
    url?: true
    mediaResourceId?: true
    _all?: true
  }

  export type EnlaceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enlace to aggregate.
     */
    where?: EnlaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enlaces to fetch.
     */
    orderBy?: EnlaceOrderByWithRelationInput | EnlaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EnlaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enlaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enlaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Enlaces
    **/
    _count?: true | EnlaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnlaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnlaceMaxAggregateInputType
  }

  export type GetEnlaceAggregateType<T extends EnlaceAggregateArgs> = {
        [P in keyof T & keyof AggregateEnlace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEnlace[P]>
      : GetScalarType<T[P], AggregateEnlace[P]>
  }




  export type EnlaceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnlaceWhereInput
    orderBy?: EnlaceOrderByWithAggregationInput | EnlaceOrderByWithAggregationInput[]
    by: EnlaceScalarFieldEnum[] | EnlaceScalarFieldEnum
    having?: EnlaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnlaceCountAggregateInputType | true
    _min?: EnlaceMinAggregateInputType
    _max?: EnlaceMaxAggregateInputType
  }

  export type EnlaceGroupByOutputType = {
    id: string
    tipo: string
    url: string
    mediaResourceId: string
    _count: EnlaceCountAggregateOutputType | null
    _min: EnlaceMinAggregateOutputType | null
    _max: EnlaceMaxAggregateOutputType | null
  }

  type GetEnlaceGroupByPayload<T extends EnlaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnlaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnlaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnlaceGroupByOutputType[P]>
            : GetScalarType<T[P], EnlaceGroupByOutputType[P]>
        }
      >
    >


  export type EnlaceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo?: boolean
    url?: boolean
    mediaResourceId?: boolean
    mediaResource?: boolean | MediaResourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enlace"]>

  export type EnlaceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo?: boolean
    url?: boolean
    mediaResourceId?: boolean
    mediaResource?: boolean | MediaResourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enlace"]>

  export type EnlaceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo?: boolean
    url?: boolean
    mediaResourceId?: boolean
    mediaResource?: boolean | MediaResourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enlace"]>

  export type EnlaceSelectScalar = {
    id?: boolean
    tipo?: boolean
    url?: boolean
    mediaResourceId?: boolean
  }

  export type EnlaceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tipo" | "url" | "mediaResourceId", ExtArgs["result"]["enlace"]>
  export type EnlaceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mediaResource?: boolean | MediaResourceDefaultArgs<ExtArgs>
  }
  export type EnlaceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mediaResource?: boolean | MediaResourceDefaultArgs<ExtArgs>
  }
  export type EnlaceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mediaResource?: boolean | MediaResourceDefaultArgs<ExtArgs>
  }

  export type $EnlacePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Enlace"
    objects: {
      mediaResource: Prisma.$MediaResourcePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tipo: string
      url: string
      mediaResourceId: string
    }, ExtArgs["result"]["enlace"]>
    composites: {}
  }

  type EnlaceGetPayload<S extends boolean | null | undefined | EnlaceDefaultArgs> = $Result.GetResult<Prisma.$EnlacePayload, S>

  type EnlaceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EnlaceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EnlaceCountAggregateInputType | true
    }

  export interface EnlaceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Enlace'], meta: { name: 'Enlace' } }
    /**
     * Find zero or one Enlace that matches the filter.
     * @param {EnlaceFindUniqueArgs} args - Arguments to find a Enlace
     * @example
     * // Get one Enlace
     * const enlace = await prisma.enlace.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EnlaceFindUniqueArgs>(args: SelectSubset<T, EnlaceFindUniqueArgs<ExtArgs>>): Prisma__EnlaceClient<$Result.GetResult<Prisma.$EnlacePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Enlace that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EnlaceFindUniqueOrThrowArgs} args - Arguments to find a Enlace
     * @example
     * // Get one Enlace
     * const enlace = await prisma.enlace.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EnlaceFindUniqueOrThrowArgs>(args: SelectSubset<T, EnlaceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EnlaceClient<$Result.GetResult<Prisma.$EnlacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enlace that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnlaceFindFirstArgs} args - Arguments to find a Enlace
     * @example
     * // Get one Enlace
     * const enlace = await prisma.enlace.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EnlaceFindFirstArgs>(args?: SelectSubset<T, EnlaceFindFirstArgs<ExtArgs>>): Prisma__EnlaceClient<$Result.GetResult<Prisma.$EnlacePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enlace that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnlaceFindFirstOrThrowArgs} args - Arguments to find a Enlace
     * @example
     * // Get one Enlace
     * const enlace = await prisma.enlace.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EnlaceFindFirstOrThrowArgs>(args?: SelectSubset<T, EnlaceFindFirstOrThrowArgs<ExtArgs>>): Prisma__EnlaceClient<$Result.GetResult<Prisma.$EnlacePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Enlaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnlaceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Enlaces
     * const enlaces = await prisma.enlace.findMany()
     * 
     * // Get first 10 Enlaces
     * const enlaces = await prisma.enlace.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const enlaceWithIdOnly = await prisma.enlace.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EnlaceFindManyArgs>(args?: SelectSubset<T, EnlaceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnlacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Enlace.
     * @param {EnlaceCreateArgs} args - Arguments to create a Enlace.
     * @example
     * // Create one Enlace
     * const Enlace = await prisma.enlace.create({
     *   data: {
     *     // ... data to create a Enlace
     *   }
     * })
     * 
     */
    create<T extends EnlaceCreateArgs>(args: SelectSubset<T, EnlaceCreateArgs<ExtArgs>>): Prisma__EnlaceClient<$Result.GetResult<Prisma.$EnlacePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Enlaces.
     * @param {EnlaceCreateManyArgs} args - Arguments to create many Enlaces.
     * @example
     * // Create many Enlaces
     * const enlace = await prisma.enlace.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EnlaceCreateManyArgs>(args?: SelectSubset<T, EnlaceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Enlaces and returns the data saved in the database.
     * @param {EnlaceCreateManyAndReturnArgs} args - Arguments to create many Enlaces.
     * @example
     * // Create many Enlaces
     * const enlace = await prisma.enlace.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Enlaces and only return the `id`
     * const enlaceWithIdOnly = await prisma.enlace.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EnlaceCreateManyAndReturnArgs>(args?: SelectSubset<T, EnlaceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnlacePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Enlace.
     * @param {EnlaceDeleteArgs} args - Arguments to delete one Enlace.
     * @example
     * // Delete one Enlace
     * const Enlace = await prisma.enlace.delete({
     *   where: {
     *     // ... filter to delete one Enlace
     *   }
     * })
     * 
     */
    delete<T extends EnlaceDeleteArgs>(args: SelectSubset<T, EnlaceDeleteArgs<ExtArgs>>): Prisma__EnlaceClient<$Result.GetResult<Prisma.$EnlacePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Enlace.
     * @param {EnlaceUpdateArgs} args - Arguments to update one Enlace.
     * @example
     * // Update one Enlace
     * const enlace = await prisma.enlace.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EnlaceUpdateArgs>(args: SelectSubset<T, EnlaceUpdateArgs<ExtArgs>>): Prisma__EnlaceClient<$Result.GetResult<Prisma.$EnlacePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Enlaces.
     * @param {EnlaceDeleteManyArgs} args - Arguments to filter Enlaces to delete.
     * @example
     * // Delete a few Enlaces
     * const { count } = await prisma.enlace.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EnlaceDeleteManyArgs>(args?: SelectSubset<T, EnlaceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enlaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnlaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Enlaces
     * const enlace = await prisma.enlace.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EnlaceUpdateManyArgs>(args: SelectSubset<T, EnlaceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enlaces and returns the data updated in the database.
     * @param {EnlaceUpdateManyAndReturnArgs} args - Arguments to update many Enlaces.
     * @example
     * // Update many Enlaces
     * const enlace = await prisma.enlace.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Enlaces and only return the `id`
     * const enlaceWithIdOnly = await prisma.enlace.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EnlaceUpdateManyAndReturnArgs>(args: SelectSubset<T, EnlaceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnlacePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Enlace.
     * @param {EnlaceUpsertArgs} args - Arguments to update or create a Enlace.
     * @example
     * // Update or create a Enlace
     * const enlace = await prisma.enlace.upsert({
     *   create: {
     *     // ... data to create a Enlace
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Enlace we want to update
     *   }
     * })
     */
    upsert<T extends EnlaceUpsertArgs>(args: SelectSubset<T, EnlaceUpsertArgs<ExtArgs>>): Prisma__EnlaceClient<$Result.GetResult<Prisma.$EnlacePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Enlaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnlaceCountArgs} args - Arguments to filter Enlaces to count.
     * @example
     * // Count the number of Enlaces
     * const count = await prisma.enlace.count({
     *   where: {
     *     // ... the filter for the Enlaces we want to count
     *   }
     * })
    **/
    count<T extends EnlaceCountArgs>(
      args?: Subset<T, EnlaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnlaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Enlace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnlaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EnlaceAggregateArgs>(args: Subset<T, EnlaceAggregateArgs>): Prisma.PrismaPromise<GetEnlaceAggregateType<T>>

    /**
     * Group by Enlace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnlaceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EnlaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EnlaceGroupByArgs['orderBy'] }
        : { orderBy?: EnlaceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EnlaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnlaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Enlace model
   */
  readonly fields: EnlaceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Enlace.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EnlaceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mediaResource<T extends MediaResourceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MediaResourceDefaultArgs<ExtArgs>>): Prisma__MediaResourceClient<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Enlace model
   */
  interface EnlaceFieldRefs {
    readonly id: FieldRef<"Enlace", 'String'>
    readonly tipo: FieldRef<"Enlace", 'String'>
    readonly url: FieldRef<"Enlace", 'String'>
    readonly mediaResourceId: FieldRef<"Enlace", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Enlace findUnique
   */
  export type EnlaceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enlace
     */
    select?: EnlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enlace
     */
    omit?: EnlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnlaceInclude<ExtArgs> | null
    /**
     * Filter, which Enlace to fetch.
     */
    where: EnlaceWhereUniqueInput
  }

  /**
   * Enlace findUniqueOrThrow
   */
  export type EnlaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enlace
     */
    select?: EnlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enlace
     */
    omit?: EnlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnlaceInclude<ExtArgs> | null
    /**
     * Filter, which Enlace to fetch.
     */
    where: EnlaceWhereUniqueInput
  }

  /**
   * Enlace findFirst
   */
  export type EnlaceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enlace
     */
    select?: EnlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enlace
     */
    omit?: EnlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnlaceInclude<ExtArgs> | null
    /**
     * Filter, which Enlace to fetch.
     */
    where?: EnlaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enlaces to fetch.
     */
    orderBy?: EnlaceOrderByWithRelationInput | EnlaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enlaces.
     */
    cursor?: EnlaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enlaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enlaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enlaces.
     */
    distinct?: EnlaceScalarFieldEnum | EnlaceScalarFieldEnum[]
  }

  /**
   * Enlace findFirstOrThrow
   */
  export type EnlaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enlace
     */
    select?: EnlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enlace
     */
    omit?: EnlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnlaceInclude<ExtArgs> | null
    /**
     * Filter, which Enlace to fetch.
     */
    where?: EnlaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enlaces to fetch.
     */
    orderBy?: EnlaceOrderByWithRelationInput | EnlaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enlaces.
     */
    cursor?: EnlaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enlaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enlaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enlaces.
     */
    distinct?: EnlaceScalarFieldEnum | EnlaceScalarFieldEnum[]
  }

  /**
   * Enlace findMany
   */
  export type EnlaceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enlace
     */
    select?: EnlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enlace
     */
    omit?: EnlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnlaceInclude<ExtArgs> | null
    /**
     * Filter, which Enlaces to fetch.
     */
    where?: EnlaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enlaces to fetch.
     */
    orderBy?: EnlaceOrderByWithRelationInput | EnlaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Enlaces.
     */
    cursor?: EnlaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enlaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enlaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enlaces.
     */
    distinct?: EnlaceScalarFieldEnum | EnlaceScalarFieldEnum[]
  }

  /**
   * Enlace create
   */
  export type EnlaceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enlace
     */
    select?: EnlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enlace
     */
    omit?: EnlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnlaceInclude<ExtArgs> | null
    /**
     * The data needed to create a Enlace.
     */
    data: XOR<EnlaceCreateInput, EnlaceUncheckedCreateInput>
  }

  /**
   * Enlace createMany
   */
  export type EnlaceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Enlaces.
     */
    data: EnlaceCreateManyInput | EnlaceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Enlace createManyAndReturn
   */
  export type EnlaceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enlace
     */
    select?: EnlaceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Enlace
     */
    omit?: EnlaceOmit<ExtArgs> | null
    /**
     * The data used to create many Enlaces.
     */
    data: EnlaceCreateManyInput | EnlaceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnlaceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Enlace update
   */
  export type EnlaceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enlace
     */
    select?: EnlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enlace
     */
    omit?: EnlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnlaceInclude<ExtArgs> | null
    /**
     * The data needed to update a Enlace.
     */
    data: XOR<EnlaceUpdateInput, EnlaceUncheckedUpdateInput>
    /**
     * Choose, which Enlace to update.
     */
    where: EnlaceWhereUniqueInput
  }

  /**
   * Enlace updateMany
   */
  export type EnlaceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Enlaces.
     */
    data: XOR<EnlaceUpdateManyMutationInput, EnlaceUncheckedUpdateManyInput>
    /**
     * Filter which Enlaces to update
     */
    where?: EnlaceWhereInput
    /**
     * Limit how many Enlaces to update.
     */
    limit?: number
  }

  /**
   * Enlace updateManyAndReturn
   */
  export type EnlaceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enlace
     */
    select?: EnlaceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Enlace
     */
    omit?: EnlaceOmit<ExtArgs> | null
    /**
     * The data used to update Enlaces.
     */
    data: XOR<EnlaceUpdateManyMutationInput, EnlaceUncheckedUpdateManyInput>
    /**
     * Filter which Enlaces to update
     */
    where?: EnlaceWhereInput
    /**
     * Limit how many Enlaces to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnlaceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Enlace upsert
   */
  export type EnlaceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enlace
     */
    select?: EnlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enlace
     */
    omit?: EnlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnlaceInclude<ExtArgs> | null
    /**
     * The filter to search for the Enlace to update in case it exists.
     */
    where: EnlaceWhereUniqueInput
    /**
     * In case the Enlace found by the `where` argument doesn't exist, create a new Enlace with this data.
     */
    create: XOR<EnlaceCreateInput, EnlaceUncheckedCreateInput>
    /**
     * In case the Enlace was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EnlaceUpdateInput, EnlaceUncheckedUpdateInput>
  }

  /**
   * Enlace delete
   */
  export type EnlaceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enlace
     */
    select?: EnlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enlace
     */
    omit?: EnlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnlaceInclude<ExtArgs> | null
    /**
     * Filter which Enlace to delete.
     */
    where: EnlaceWhereUniqueInput
  }

  /**
   * Enlace deleteMany
   */
  export type EnlaceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enlaces to delete
     */
    where?: EnlaceWhereInput
    /**
     * Limit how many Enlaces to delete.
     */
    limit?: number
  }

  /**
   * Enlace without action
   */
  export type EnlaceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enlace
     */
    select?: EnlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enlace
     */
    omit?: EnlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnlaceInclude<ExtArgs> | null
  }


  /**
   * Model Vineta
   */

  export type AggregateVineta = {
    _count: VinetaCountAggregateOutputType | null
    _min: VinetaMinAggregateOutputType | null
    _max: VinetaMaxAggregateOutputType | null
  }

  export type VinetaMinAggregateOutputType = {
    id: string | null
    comentario: string | null
    mediaResourceId: string | null
  }

  export type VinetaMaxAggregateOutputType = {
    id: string | null
    comentario: string | null
    mediaResourceId: string | null
  }

  export type VinetaCountAggregateOutputType = {
    id: number
    comentario: number
    mediaResourceId: number
    _all: number
  }


  export type VinetaMinAggregateInputType = {
    id?: true
    comentario?: true
    mediaResourceId?: true
  }

  export type VinetaMaxAggregateInputType = {
    id?: true
    comentario?: true
    mediaResourceId?: true
  }

  export type VinetaCountAggregateInputType = {
    id?: true
    comentario?: true
    mediaResourceId?: true
    _all?: true
  }

  export type VinetaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vineta to aggregate.
     */
    where?: VinetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vinetas to fetch.
     */
    orderBy?: VinetaOrderByWithRelationInput | VinetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VinetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vinetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vinetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vinetas
    **/
    _count?: true | VinetaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VinetaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VinetaMaxAggregateInputType
  }

  export type GetVinetaAggregateType<T extends VinetaAggregateArgs> = {
        [P in keyof T & keyof AggregateVineta]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVineta[P]>
      : GetScalarType<T[P], AggregateVineta[P]>
  }




  export type VinetaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VinetaWhereInput
    orderBy?: VinetaOrderByWithAggregationInput | VinetaOrderByWithAggregationInput[]
    by: VinetaScalarFieldEnum[] | VinetaScalarFieldEnum
    having?: VinetaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VinetaCountAggregateInputType | true
    _min?: VinetaMinAggregateInputType
    _max?: VinetaMaxAggregateInputType
  }

  export type VinetaGroupByOutputType = {
    id: string
    comentario: string
    mediaResourceId: string
    _count: VinetaCountAggregateOutputType | null
    _min: VinetaMinAggregateOutputType | null
    _max: VinetaMaxAggregateOutputType | null
  }

  type GetVinetaGroupByPayload<T extends VinetaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VinetaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VinetaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VinetaGroupByOutputType[P]>
            : GetScalarType<T[P], VinetaGroupByOutputType[P]>
        }
      >
    >


  export type VinetaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    comentario?: boolean
    mediaResourceId?: boolean
    mediaResource?: boolean | MediaResourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vineta"]>

  export type VinetaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    comentario?: boolean
    mediaResourceId?: boolean
    mediaResource?: boolean | MediaResourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vineta"]>

  export type VinetaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    comentario?: boolean
    mediaResourceId?: boolean
    mediaResource?: boolean | MediaResourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vineta"]>

  export type VinetaSelectScalar = {
    id?: boolean
    comentario?: boolean
    mediaResourceId?: boolean
  }

  export type VinetaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "comentario" | "mediaResourceId", ExtArgs["result"]["vineta"]>
  export type VinetaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mediaResource?: boolean | MediaResourceDefaultArgs<ExtArgs>
  }
  export type VinetaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mediaResource?: boolean | MediaResourceDefaultArgs<ExtArgs>
  }
  export type VinetaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mediaResource?: boolean | MediaResourceDefaultArgs<ExtArgs>
  }

  export type $VinetaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vineta"
    objects: {
      mediaResource: Prisma.$MediaResourcePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      comentario: string
      mediaResourceId: string
    }, ExtArgs["result"]["vineta"]>
    composites: {}
  }

  type VinetaGetPayload<S extends boolean | null | undefined | VinetaDefaultArgs> = $Result.GetResult<Prisma.$VinetaPayload, S>

  type VinetaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VinetaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VinetaCountAggregateInputType | true
    }

  export interface VinetaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vineta'], meta: { name: 'Vineta' } }
    /**
     * Find zero or one Vineta that matches the filter.
     * @param {VinetaFindUniqueArgs} args - Arguments to find a Vineta
     * @example
     * // Get one Vineta
     * const vineta = await prisma.vineta.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VinetaFindUniqueArgs>(args: SelectSubset<T, VinetaFindUniqueArgs<ExtArgs>>): Prisma__VinetaClient<$Result.GetResult<Prisma.$VinetaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vineta that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VinetaFindUniqueOrThrowArgs} args - Arguments to find a Vineta
     * @example
     * // Get one Vineta
     * const vineta = await prisma.vineta.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VinetaFindUniqueOrThrowArgs>(args: SelectSubset<T, VinetaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VinetaClient<$Result.GetResult<Prisma.$VinetaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vineta that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VinetaFindFirstArgs} args - Arguments to find a Vineta
     * @example
     * // Get one Vineta
     * const vineta = await prisma.vineta.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VinetaFindFirstArgs>(args?: SelectSubset<T, VinetaFindFirstArgs<ExtArgs>>): Prisma__VinetaClient<$Result.GetResult<Prisma.$VinetaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vineta that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VinetaFindFirstOrThrowArgs} args - Arguments to find a Vineta
     * @example
     * // Get one Vineta
     * const vineta = await prisma.vineta.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VinetaFindFirstOrThrowArgs>(args?: SelectSubset<T, VinetaFindFirstOrThrowArgs<ExtArgs>>): Prisma__VinetaClient<$Result.GetResult<Prisma.$VinetaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vinetas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VinetaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vinetas
     * const vinetas = await prisma.vineta.findMany()
     * 
     * // Get first 10 Vinetas
     * const vinetas = await prisma.vineta.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vinetaWithIdOnly = await prisma.vineta.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VinetaFindManyArgs>(args?: SelectSubset<T, VinetaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VinetaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vineta.
     * @param {VinetaCreateArgs} args - Arguments to create a Vineta.
     * @example
     * // Create one Vineta
     * const Vineta = await prisma.vineta.create({
     *   data: {
     *     // ... data to create a Vineta
     *   }
     * })
     * 
     */
    create<T extends VinetaCreateArgs>(args: SelectSubset<T, VinetaCreateArgs<ExtArgs>>): Prisma__VinetaClient<$Result.GetResult<Prisma.$VinetaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vinetas.
     * @param {VinetaCreateManyArgs} args - Arguments to create many Vinetas.
     * @example
     * // Create many Vinetas
     * const vineta = await prisma.vineta.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VinetaCreateManyArgs>(args?: SelectSubset<T, VinetaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vinetas and returns the data saved in the database.
     * @param {VinetaCreateManyAndReturnArgs} args - Arguments to create many Vinetas.
     * @example
     * // Create many Vinetas
     * const vineta = await prisma.vineta.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vinetas and only return the `id`
     * const vinetaWithIdOnly = await prisma.vineta.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VinetaCreateManyAndReturnArgs>(args?: SelectSubset<T, VinetaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VinetaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vineta.
     * @param {VinetaDeleteArgs} args - Arguments to delete one Vineta.
     * @example
     * // Delete one Vineta
     * const Vineta = await prisma.vineta.delete({
     *   where: {
     *     // ... filter to delete one Vineta
     *   }
     * })
     * 
     */
    delete<T extends VinetaDeleteArgs>(args: SelectSubset<T, VinetaDeleteArgs<ExtArgs>>): Prisma__VinetaClient<$Result.GetResult<Prisma.$VinetaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vineta.
     * @param {VinetaUpdateArgs} args - Arguments to update one Vineta.
     * @example
     * // Update one Vineta
     * const vineta = await prisma.vineta.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VinetaUpdateArgs>(args: SelectSubset<T, VinetaUpdateArgs<ExtArgs>>): Prisma__VinetaClient<$Result.GetResult<Prisma.$VinetaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vinetas.
     * @param {VinetaDeleteManyArgs} args - Arguments to filter Vinetas to delete.
     * @example
     * // Delete a few Vinetas
     * const { count } = await prisma.vineta.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VinetaDeleteManyArgs>(args?: SelectSubset<T, VinetaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vinetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VinetaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vinetas
     * const vineta = await prisma.vineta.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VinetaUpdateManyArgs>(args: SelectSubset<T, VinetaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vinetas and returns the data updated in the database.
     * @param {VinetaUpdateManyAndReturnArgs} args - Arguments to update many Vinetas.
     * @example
     * // Update many Vinetas
     * const vineta = await prisma.vineta.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vinetas and only return the `id`
     * const vinetaWithIdOnly = await prisma.vineta.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VinetaUpdateManyAndReturnArgs>(args: SelectSubset<T, VinetaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VinetaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vineta.
     * @param {VinetaUpsertArgs} args - Arguments to update or create a Vineta.
     * @example
     * // Update or create a Vineta
     * const vineta = await prisma.vineta.upsert({
     *   create: {
     *     // ... data to create a Vineta
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vineta we want to update
     *   }
     * })
     */
    upsert<T extends VinetaUpsertArgs>(args: SelectSubset<T, VinetaUpsertArgs<ExtArgs>>): Prisma__VinetaClient<$Result.GetResult<Prisma.$VinetaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vinetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VinetaCountArgs} args - Arguments to filter Vinetas to count.
     * @example
     * // Count the number of Vinetas
     * const count = await prisma.vineta.count({
     *   where: {
     *     // ... the filter for the Vinetas we want to count
     *   }
     * })
    **/
    count<T extends VinetaCountArgs>(
      args?: Subset<T, VinetaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VinetaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vineta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VinetaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VinetaAggregateArgs>(args: Subset<T, VinetaAggregateArgs>): Prisma.PrismaPromise<GetVinetaAggregateType<T>>

    /**
     * Group by Vineta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VinetaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VinetaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VinetaGroupByArgs['orderBy'] }
        : { orderBy?: VinetaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VinetaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVinetaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vineta model
   */
  readonly fields: VinetaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vineta.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VinetaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mediaResource<T extends MediaResourceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MediaResourceDefaultArgs<ExtArgs>>): Prisma__MediaResourceClient<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vineta model
   */
  interface VinetaFieldRefs {
    readonly id: FieldRef<"Vineta", 'String'>
    readonly comentario: FieldRef<"Vineta", 'String'>
    readonly mediaResourceId: FieldRef<"Vineta", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Vineta findUnique
   */
  export type VinetaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vineta
     */
    select?: VinetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vineta
     */
    omit?: VinetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinetaInclude<ExtArgs> | null
    /**
     * Filter, which Vineta to fetch.
     */
    where: VinetaWhereUniqueInput
  }

  /**
   * Vineta findUniqueOrThrow
   */
  export type VinetaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vineta
     */
    select?: VinetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vineta
     */
    omit?: VinetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinetaInclude<ExtArgs> | null
    /**
     * Filter, which Vineta to fetch.
     */
    where: VinetaWhereUniqueInput
  }

  /**
   * Vineta findFirst
   */
  export type VinetaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vineta
     */
    select?: VinetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vineta
     */
    omit?: VinetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinetaInclude<ExtArgs> | null
    /**
     * Filter, which Vineta to fetch.
     */
    where?: VinetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vinetas to fetch.
     */
    orderBy?: VinetaOrderByWithRelationInput | VinetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vinetas.
     */
    cursor?: VinetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vinetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vinetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vinetas.
     */
    distinct?: VinetaScalarFieldEnum | VinetaScalarFieldEnum[]
  }

  /**
   * Vineta findFirstOrThrow
   */
  export type VinetaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vineta
     */
    select?: VinetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vineta
     */
    omit?: VinetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinetaInclude<ExtArgs> | null
    /**
     * Filter, which Vineta to fetch.
     */
    where?: VinetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vinetas to fetch.
     */
    orderBy?: VinetaOrderByWithRelationInput | VinetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vinetas.
     */
    cursor?: VinetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vinetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vinetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vinetas.
     */
    distinct?: VinetaScalarFieldEnum | VinetaScalarFieldEnum[]
  }

  /**
   * Vineta findMany
   */
  export type VinetaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vineta
     */
    select?: VinetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vineta
     */
    omit?: VinetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinetaInclude<ExtArgs> | null
    /**
     * Filter, which Vinetas to fetch.
     */
    where?: VinetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vinetas to fetch.
     */
    orderBy?: VinetaOrderByWithRelationInput | VinetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vinetas.
     */
    cursor?: VinetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vinetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vinetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vinetas.
     */
    distinct?: VinetaScalarFieldEnum | VinetaScalarFieldEnum[]
  }

  /**
   * Vineta create
   */
  export type VinetaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vineta
     */
    select?: VinetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vineta
     */
    omit?: VinetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinetaInclude<ExtArgs> | null
    /**
     * The data needed to create a Vineta.
     */
    data: XOR<VinetaCreateInput, VinetaUncheckedCreateInput>
  }

  /**
   * Vineta createMany
   */
  export type VinetaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vinetas.
     */
    data: VinetaCreateManyInput | VinetaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vineta createManyAndReturn
   */
  export type VinetaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vineta
     */
    select?: VinetaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vineta
     */
    omit?: VinetaOmit<ExtArgs> | null
    /**
     * The data used to create many Vinetas.
     */
    data: VinetaCreateManyInput | VinetaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinetaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vineta update
   */
  export type VinetaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vineta
     */
    select?: VinetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vineta
     */
    omit?: VinetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinetaInclude<ExtArgs> | null
    /**
     * The data needed to update a Vineta.
     */
    data: XOR<VinetaUpdateInput, VinetaUncheckedUpdateInput>
    /**
     * Choose, which Vineta to update.
     */
    where: VinetaWhereUniqueInput
  }

  /**
   * Vineta updateMany
   */
  export type VinetaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vinetas.
     */
    data: XOR<VinetaUpdateManyMutationInput, VinetaUncheckedUpdateManyInput>
    /**
     * Filter which Vinetas to update
     */
    where?: VinetaWhereInput
    /**
     * Limit how many Vinetas to update.
     */
    limit?: number
  }

  /**
   * Vineta updateManyAndReturn
   */
  export type VinetaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vineta
     */
    select?: VinetaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vineta
     */
    omit?: VinetaOmit<ExtArgs> | null
    /**
     * The data used to update Vinetas.
     */
    data: XOR<VinetaUpdateManyMutationInput, VinetaUncheckedUpdateManyInput>
    /**
     * Filter which Vinetas to update
     */
    where?: VinetaWhereInput
    /**
     * Limit how many Vinetas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinetaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vineta upsert
   */
  export type VinetaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vineta
     */
    select?: VinetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vineta
     */
    omit?: VinetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinetaInclude<ExtArgs> | null
    /**
     * The filter to search for the Vineta to update in case it exists.
     */
    where: VinetaWhereUniqueInput
    /**
     * In case the Vineta found by the `where` argument doesn't exist, create a new Vineta with this data.
     */
    create: XOR<VinetaCreateInput, VinetaUncheckedCreateInput>
    /**
     * In case the Vineta was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VinetaUpdateInput, VinetaUncheckedUpdateInput>
  }

  /**
   * Vineta delete
   */
  export type VinetaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vineta
     */
    select?: VinetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vineta
     */
    omit?: VinetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinetaInclude<ExtArgs> | null
    /**
     * Filter which Vineta to delete.
     */
    where: VinetaWhereUniqueInput
  }

  /**
   * Vineta deleteMany
   */
  export type VinetaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vinetas to delete
     */
    where?: VinetaWhereInput
    /**
     * Limit how many Vinetas to delete.
     */
    limit?: number
  }

  /**
   * Vineta without action
   */
  export type VinetaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vineta
     */
    select?: VinetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vineta
     */
    omit?: VinetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VinetaInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const DispositivoScalarFieldEnum: {
    id: 'id',
    credentialId: 'credentialId',
    publicKey: 'publicKey',
    counter: 'counter',
    usuarioId: 'usuarioId'
  };

  export type DispositivoScalarFieldEnum = (typeof DispositivoScalarFieldEnum)[keyof typeof DispositivoScalarFieldEnum]


  export const MediaResourceScalarFieldEnum: {
    id: 'id',
    imagenPrincipalUrl: 'imagenPrincipalUrl',
    nombre: 'nombre',
    descripcion: 'descripcion',
    instituto: 'instituto',
    miniaturaUrl: 'miniaturaUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MediaResourceScalarFieldEnum = (typeof MediaResourceScalarFieldEnum)[keyof typeof MediaResourceScalarFieldEnum]


  export const CategoriaScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    mediaResourceId: 'mediaResourceId'
  };

  export type CategoriaScalarFieldEnum = (typeof CategoriaScalarFieldEnum)[keyof typeof CategoriaScalarFieldEnum]


  export const EnlaceScalarFieldEnum: {
    id: 'id',
    tipo: 'tipo',
    url: 'url',
    mediaResourceId: 'mediaResourceId'
  };

  export type EnlaceScalarFieldEnum = (typeof EnlaceScalarFieldEnum)[keyof typeof EnlaceScalarFieldEnum]


  export const VinetaScalarFieldEnum: {
    id: 'id',
    comentario: 'comentario',
    mediaResourceId: 'mediaResourceId'
  };

  export type VinetaScalarFieldEnum = (typeof VinetaScalarFieldEnum)[keyof typeof VinetaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    passwordHash?: StringFilter<"Usuario"> | string
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    dispositivos?: DispositivoListRelationFilter
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    dispositivos?: DispositivoOrderByRelationAggregateInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    passwordHash?: StringFilter<"Usuario"> | string
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    dispositivos?: DispositivoListRelationFilter
  }, "id" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    passwordHash?: StringWithAggregatesFilter<"Usuario"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
  }

  export type DispositivoWhereInput = {
    AND?: DispositivoWhereInput | DispositivoWhereInput[]
    OR?: DispositivoWhereInput[]
    NOT?: DispositivoWhereInput | DispositivoWhereInput[]
    id?: StringFilter<"Dispositivo"> | string
    credentialId?: StringFilter<"Dispositivo"> | string
    publicKey?: StringFilter<"Dispositivo"> | string
    counter?: IntFilter<"Dispositivo"> | number
    usuarioId?: StringFilter<"Dispositivo"> | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type DispositivoOrderByWithRelationInput = {
    id?: SortOrder
    credentialId?: SortOrder
    publicKey?: SortOrder
    counter?: SortOrder
    usuarioId?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
  }

  export type DispositivoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    credentialId?: string
    AND?: DispositivoWhereInput | DispositivoWhereInput[]
    OR?: DispositivoWhereInput[]
    NOT?: DispositivoWhereInput | DispositivoWhereInput[]
    publicKey?: StringFilter<"Dispositivo"> | string
    counter?: IntFilter<"Dispositivo"> | number
    usuarioId?: StringFilter<"Dispositivo"> | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "id" | "credentialId">

  export type DispositivoOrderByWithAggregationInput = {
    id?: SortOrder
    credentialId?: SortOrder
    publicKey?: SortOrder
    counter?: SortOrder
    usuarioId?: SortOrder
    _count?: DispositivoCountOrderByAggregateInput
    _avg?: DispositivoAvgOrderByAggregateInput
    _max?: DispositivoMaxOrderByAggregateInput
    _min?: DispositivoMinOrderByAggregateInput
    _sum?: DispositivoSumOrderByAggregateInput
  }

  export type DispositivoScalarWhereWithAggregatesInput = {
    AND?: DispositivoScalarWhereWithAggregatesInput | DispositivoScalarWhereWithAggregatesInput[]
    OR?: DispositivoScalarWhereWithAggregatesInput[]
    NOT?: DispositivoScalarWhereWithAggregatesInput | DispositivoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Dispositivo"> | string
    credentialId?: StringWithAggregatesFilter<"Dispositivo"> | string
    publicKey?: StringWithAggregatesFilter<"Dispositivo"> | string
    counter?: IntWithAggregatesFilter<"Dispositivo"> | number
    usuarioId?: StringWithAggregatesFilter<"Dispositivo"> | string
  }

  export type MediaResourceWhereInput = {
    AND?: MediaResourceWhereInput | MediaResourceWhereInput[]
    OR?: MediaResourceWhereInput[]
    NOT?: MediaResourceWhereInput | MediaResourceWhereInput[]
    id?: StringFilter<"MediaResource"> | string
    imagenPrincipalUrl?: StringFilter<"MediaResource"> | string
    nombre?: StringFilter<"MediaResource"> | string
    descripcion?: StringFilter<"MediaResource"> | string
    instituto?: StringNullableFilter<"MediaResource"> | string | null
    miniaturaUrl?: StringNullableFilter<"MediaResource"> | string | null
    createdAt?: DateTimeFilter<"MediaResource"> | Date | string
    updatedAt?: DateTimeFilter<"MediaResource"> | Date | string
    categorias?: CategoriaListRelationFilter
    enlaces?: EnlaceListRelationFilter
    vinetas?: VinetaListRelationFilter
  }

  export type MediaResourceOrderByWithRelationInput = {
    id?: SortOrder
    imagenPrincipalUrl?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    instituto?: SortOrderInput | SortOrder
    miniaturaUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categorias?: CategoriaOrderByRelationAggregateInput
    enlaces?: EnlaceOrderByRelationAggregateInput
    vinetas?: VinetaOrderByRelationAggregateInput
  }

  export type MediaResourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MediaResourceWhereInput | MediaResourceWhereInput[]
    OR?: MediaResourceWhereInput[]
    NOT?: MediaResourceWhereInput | MediaResourceWhereInput[]
    imagenPrincipalUrl?: StringFilter<"MediaResource"> | string
    nombre?: StringFilter<"MediaResource"> | string
    descripcion?: StringFilter<"MediaResource"> | string
    instituto?: StringNullableFilter<"MediaResource"> | string | null
    miniaturaUrl?: StringNullableFilter<"MediaResource"> | string | null
    createdAt?: DateTimeFilter<"MediaResource"> | Date | string
    updatedAt?: DateTimeFilter<"MediaResource"> | Date | string
    categorias?: CategoriaListRelationFilter
    enlaces?: EnlaceListRelationFilter
    vinetas?: VinetaListRelationFilter
  }, "id">

  export type MediaResourceOrderByWithAggregationInput = {
    id?: SortOrder
    imagenPrincipalUrl?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    instituto?: SortOrderInput | SortOrder
    miniaturaUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MediaResourceCountOrderByAggregateInput
    _max?: MediaResourceMaxOrderByAggregateInput
    _min?: MediaResourceMinOrderByAggregateInput
  }

  export type MediaResourceScalarWhereWithAggregatesInput = {
    AND?: MediaResourceScalarWhereWithAggregatesInput | MediaResourceScalarWhereWithAggregatesInput[]
    OR?: MediaResourceScalarWhereWithAggregatesInput[]
    NOT?: MediaResourceScalarWhereWithAggregatesInput | MediaResourceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MediaResource"> | string
    imagenPrincipalUrl?: StringWithAggregatesFilter<"MediaResource"> | string
    nombre?: StringWithAggregatesFilter<"MediaResource"> | string
    descripcion?: StringWithAggregatesFilter<"MediaResource"> | string
    instituto?: StringNullableWithAggregatesFilter<"MediaResource"> | string | null
    miniaturaUrl?: StringNullableWithAggregatesFilter<"MediaResource"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MediaResource"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MediaResource"> | Date | string
  }

  export type CategoriaWhereInput = {
    AND?: CategoriaWhereInput | CategoriaWhereInput[]
    OR?: CategoriaWhereInput[]
    NOT?: CategoriaWhereInput | CategoriaWhereInput[]
    id?: StringFilter<"Categoria"> | string
    nombre?: StringFilter<"Categoria"> | string
    mediaResourceId?: StringFilter<"Categoria"> | string
    mediaResource?: XOR<MediaResourceScalarRelationFilter, MediaResourceWhereInput>
  }

  export type CategoriaOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    mediaResourceId?: SortOrder
    mediaResource?: MediaResourceOrderByWithRelationInput
  }

  export type CategoriaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CategoriaWhereInput | CategoriaWhereInput[]
    OR?: CategoriaWhereInput[]
    NOT?: CategoriaWhereInput | CategoriaWhereInput[]
    nombre?: StringFilter<"Categoria"> | string
    mediaResourceId?: StringFilter<"Categoria"> | string
    mediaResource?: XOR<MediaResourceScalarRelationFilter, MediaResourceWhereInput>
  }, "id">

  export type CategoriaOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    mediaResourceId?: SortOrder
    _count?: CategoriaCountOrderByAggregateInput
    _max?: CategoriaMaxOrderByAggregateInput
    _min?: CategoriaMinOrderByAggregateInput
  }

  export type CategoriaScalarWhereWithAggregatesInput = {
    AND?: CategoriaScalarWhereWithAggregatesInput | CategoriaScalarWhereWithAggregatesInput[]
    OR?: CategoriaScalarWhereWithAggregatesInput[]
    NOT?: CategoriaScalarWhereWithAggregatesInput | CategoriaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Categoria"> | string
    nombre?: StringWithAggregatesFilter<"Categoria"> | string
    mediaResourceId?: StringWithAggregatesFilter<"Categoria"> | string
  }

  export type EnlaceWhereInput = {
    AND?: EnlaceWhereInput | EnlaceWhereInput[]
    OR?: EnlaceWhereInput[]
    NOT?: EnlaceWhereInput | EnlaceWhereInput[]
    id?: StringFilter<"Enlace"> | string
    tipo?: StringFilter<"Enlace"> | string
    url?: StringFilter<"Enlace"> | string
    mediaResourceId?: StringFilter<"Enlace"> | string
    mediaResource?: XOR<MediaResourceScalarRelationFilter, MediaResourceWhereInput>
  }

  export type EnlaceOrderByWithRelationInput = {
    id?: SortOrder
    tipo?: SortOrder
    url?: SortOrder
    mediaResourceId?: SortOrder
    mediaResource?: MediaResourceOrderByWithRelationInput
  }

  export type EnlaceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EnlaceWhereInput | EnlaceWhereInput[]
    OR?: EnlaceWhereInput[]
    NOT?: EnlaceWhereInput | EnlaceWhereInput[]
    tipo?: StringFilter<"Enlace"> | string
    url?: StringFilter<"Enlace"> | string
    mediaResourceId?: StringFilter<"Enlace"> | string
    mediaResource?: XOR<MediaResourceScalarRelationFilter, MediaResourceWhereInput>
  }, "id">

  export type EnlaceOrderByWithAggregationInput = {
    id?: SortOrder
    tipo?: SortOrder
    url?: SortOrder
    mediaResourceId?: SortOrder
    _count?: EnlaceCountOrderByAggregateInput
    _max?: EnlaceMaxOrderByAggregateInput
    _min?: EnlaceMinOrderByAggregateInput
  }

  export type EnlaceScalarWhereWithAggregatesInput = {
    AND?: EnlaceScalarWhereWithAggregatesInput | EnlaceScalarWhereWithAggregatesInput[]
    OR?: EnlaceScalarWhereWithAggregatesInput[]
    NOT?: EnlaceScalarWhereWithAggregatesInput | EnlaceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Enlace"> | string
    tipo?: StringWithAggregatesFilter<"Enlace"> | string
    url?: StringWithAggregatesFilter<"Enlace"> | string
    mediaResourceId?: StringWithAggregatesFilter<"Enlace"> | string
  }

  export type VinetaWhereInput = {
    AND?: VinetaWhereInput | VinetaWhereInput[]
    OR?: VinetaWhereInput[]
    NOT?: VinetaWhereInput | VinetaWhereInput[]
    id?: StringFilter<"Vineta"> | string
    comentario?: StringFilter<"Vineta"> | string
    mediaResourceId?: StringFilter<"Vineta"> | string
    mediaResource?: XOR<MediaResourceScalarRelationFilter, MediaResourceWhereInput>
  }

  export type VinetaOrderByWithRelationInput = {
    id?: SortOrder
    comentario?: SortOrder
    mediaResourceId?: SortOrder
    mediaResource?: MediaResourceOrderByWithRelationInput
  }

  export type VinetaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VinetaWhereInput | VinetaWhereInput[]
    OR?: VinetaWhereInput[]
    NOT?: VinetaWhereInput | VinetaWhereInput[]
    comentario?: StringFilter<"Vineta"> | string
    mediaResourceId?: StringFilter<"Vineta"> | string
    mediaResource?: XOR<MediaResourceScalarRelationFilter, MediaResourceWhereInput>
  }, "id">

  export type VinetaOrderByWithAggregationInput = {
    id?: SortOrder
    comentario?: SortOrder
    mediaResourceId?: SortOrder
    _count?: VinetaCountOrderByAggregateInput
    _max?: VinetaMaxOrderByAggregateInput
    _min?: VinetaMinOrderByAggregateInput
  }

  export type VinetaScalarWhereWithAggregatesInput = {
    AND?: VinetaScalarWhereWithAggregatesInput | VinetaScalarWhereWithAggregatesInput[]
    OR?: VinetaScalarWhereWithAggregatesInput[]
    NOT?: VinetaScalarWhereWithAggregatesInput | VinetaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vineta"> | string
    comentario?: StringWithAggregatesFilter<"Vineta"> | string
    mediaResourceId?: StringWithAggregatesFilter<"Vineta"> | string
  }

  export type UsuarioCreateInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    dispositivos?: DispositivoCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    dispositivos?: DispositivoUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dispositivos?: DispositivoUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dispositivos?: DispositivoUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
  }

  export type UsuarioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DispositivoCreateInput = {
    id?: string
    credentialId: string
    publicKey: string
    counter: number
    usuario: UsuarioCreateNestedOneWithoutDispositivosInput
  }

  export type DispositivoUncheckedCreateInput = {
    id?: string
    credentialId: string
    publicKey: string
    counter: number
    usuarioId: string
  }

  export type DispositivoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    credentialId?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    usuario?: UsuarioUpdateOneRequiredWithoutDispositivosNestedInput
  }

  export type DispositivoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    credentialId?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    usuarioId?: StringFieldUpdateOperationsInput | string
  }

  export type DispositivoCreateManyInput = {
    id?: string
    credentialId: string
    publicKey: string
    counter: number
    usuarioId: string
  }

  export type DispositivoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    credentialId?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
  }

  export type DispositivoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    credentialId?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    usuarioId?: StringFieldUpdateOperationsInput | string
  }

  export type MediaResourceCreateInput = {
    id?: string
    imagenPrincipalUrl: string
    nombre: string
    descripcion: string
    instituto?: string | null
    miniaturaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categorias?: CategoriaCreateNestedManyWithoutMediaResourceInput
    enlaces?: EnlaceCreateNestedManyWithoutMediaResourceInput
    vinetas?: VinetaCreateNestedManyWithoutMediaResourceInput
  }

  export type MediaResourceUncheckedCreateInput = {
    id?: string
    imagenPrincipalUrl: string
    nombre: string
    descripcion: string
    instituto?: string | null
    miniaturaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categorias?: CategoriaUncheckedCreateNestedManyWithoutMediaResourceInput
    enlaces?: EnlaceUncheckedCreateNestedManyWithoutMediaResourceInput
    vinetas?: VinetaUncheckedCreateNestedManyWithoutMediaResourceInput
  }

  export type MediaResourceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    imagenPrincipalUrl?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    instituto?: NullableStringFieldUpdateOperationsInput | string | null
    miniaturaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUpdateManyWithoutMediaResourceNestedInput
    enlaces?: EnlaceUpdateManyWithoutMediaResourceNestedInput
    vinetas?: VinetaUpdateManyWithoutMediaResourceNestedInput
  }

  export type MediaResourceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    imagenPrincipalUrl?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    instituto?: NullableStringFieldUpdateOperationsInput | string | null
    miniaturaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUncheckedUpdateManyWithoutMediaResourceNestedInput
    enlaces?: EnlaceUncheckedUpdateManyWithoutMediaResourceNestedInput
    vinetas?: VinetaUncheckedUpdateManyWithoutMediaResourceNestedInput
  }

  export type MediaResourceCreateManyInput = {
    id?: string
    imagenPrincipalUrl: string
    nombre: string
    descripcion: string
    instituto?: string | null
    miniaturaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaResourceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    imagenPrincipalUrl?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    instituto?: NullableStringFieldUpdateOperationsInput | string | null
    miniaturaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaResourceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    imagenPrincipalUrl?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    instituto?: NullableStringFieldUpdateOperationsInput | string | null
    miniaturaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriaCreateInput = {
    id?: string
    nombre: string
    mediaResource: MediaResourceCreateNestedOneWithoutCategoriasInput
  }

  export type CategoriaUncheckedCreateInput = {
    id?: string
    nombre: string
    mediaResourceId: string
  }

  export type CategoriaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    mediaResource?: MediaResourceUpdateOneRequiredWithoutCategoriasNestedInput
  }

  export type CategoriaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    mediaResourceId?: StringFieldUpdateOperationsInput | string
  }

  export type CategoriaCreateManyInput = {
    id?: string
    nombre: string
    mediaResourceId: string
  }

  export type CategoriaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type CategoriaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    mediaResourceId?: StringFieldUpdateOperationsInput | string
  }

  export type EnlaceCreateInput = {
    id?: string
    tipo: string
    url: string
    mediaResource: MediaResourceCreateNestedOneWithoutEnlacesInput
  }

  export type EnlaceUncheckedCreateInput = {
    id?: string
    tipo: string
    url: string
    mediaResourceId: string
  }

  export type EnlaceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    mediaResource?: MediaResourceUpdateOneRequiredWithoutEnlacesNestedInput
  }

  export type EnlaceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    mediaResourceId?: StringFieldUpdateOperationsInput | string
  }

  export type EnlaceCreateManyInput = {
    id?: string
    tipo: string
    url: string
    mediaResourceId: string
  }

  export type EnlaceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type EnlaceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    mediaResourceId?: StringFieldUpdateOperationsInput | string
  }

  export type VinetaCreateInput = {
    id?: string
    comentario: string
    mediaResource: MediaResourceCreateNestedOneWithoutVinetasInput
  }

  export type VinetaUncheckedCreateInput = {
    id?: string
    comentario: string
    mediaResourceId: string
  }

  export type VinetaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    comentario?: StringFieldUpdateOperationsInput | string
    mediaResource?: MediaResourceUpdateOneRequiredWithoutVinetasNestedInput
  }

  export type VinetaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    comentario?: StringFieldUpdateOperationsInput | string
    mediaResourceId?: StringFieldUpdateOperationsInput | string
  }

  export type VinetaCreateManyInput = {
    id?: string
    comentario: string
    mediaResourceId: string
  }

  export type VinetaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    comentario?: StringFieldUpdateOperationsInput | string
  }

  export type VinetaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    comentario?: StringFieldUpdateOperationsInput | string
    mediaResourceId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DispositivoListRelationFilter = {
    every?: DispositivoWhereInput
    some?: DispositivoWhereInput
    none?: DispositivoWhereInput
  }

  export type DispositivoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UsuarioScalarRelationFilter = {
    is?: UsuarioWhereInput
    isNot?: UsuarioWhereInput
  }

  export type DispositivoCountOrderByAggregateInput = {
    id?: SortOrder
    credentialId?: SortOrder
    publicKey?: SortOrder
    counter?: SortOrder
    usuarioId?: SortOrder
  }

  export type DispositivoAvgOrderByAggregateInput = {
    counter?: SortOrder
  }

  export type DispositivoMaxOrderByAggregateInput = {
    id?: SortOrder
    credentialId?: SortOrder
    publicKey?: SortOrder
    counter?: SortOrder
    usuarioId?: SortOrder
  }

  export type DispositivoMinOrderByAggregateInput = {
    id?: SortOrder
    credentialId?: SortOrder
    publicKey?: SortOrder
    counter?: SortOrder
    usuarioId?: SortOrder
  }

  export type DispositivoSumOrderByAggregateInput = {
    counter?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type CategoriaListRelationFilter = {
    every?: CategoriaWhereInput
    some?: CategoriaWhereInput
    none?: CategoriaWhereInput
  }

  export type EnlaceListRelationFilter = {
    every?: EnlaceWhereInput
    some?: EnlaceWhereInput
    none?: EnlaceWhereInput
  }

  export type VinetaListRelationFilter = {
    every?: VinetaWhereInput
    some?: VinetaWhereInput
    none?: VinetaWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CategoriaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EnlaceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VinetaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MediaResourceCountOrderByAggregateInput = {
    id?: SortOrder
    imagenPrincipalUrl?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    instituto?: SortOrder
    miniaturaUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MediaResourceMaxOrderByAggregateInput = {
    id?: SortOrder
    imagenPrincipalUrl?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    instituto?: SortOrder
    miniaturaUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MediaResourceMinOrderByAggregateInput = {
    id?: SortOrder
    imagenPrincipalUrl?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    instituto?: SortOrder
    miniaturaUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type MediaResourceScalarRelationFilter = {
    is?: MediaResourceWhereInput
    isNot?: MediaResourceWhereInput
  }

  export type CategoriaCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    mediaResourceId?: SortOrder
  }

  export type CategoriaMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    mediaResourceId?: SortOrder
  }

  export type CategoriaMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    mediaResourceId?: SortOrder
  }

  export type EnlaceCountOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    url?: SortOrder
    mediaResourceId?: SortOrder
  }

  export type EnlaceMaxOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    url?: SortOrder
    mediaResourceId?: SortOrder
  }

  export type EnlaceMinOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    url?: SortOrder
    mediaResourceId?: SortOrder
  }

  export type VinetaCountOrderByAggregateInput = {
    id?: SortOrder
    comentario?: SortOrder
    mediaResourceId?: SortOrder
  }

  export type VinetaMaxOrderByAggregateInput = {
    id?: SortOrder
    comentario?: SortOrder
    mediaResourceId?: SortOrder
  }

  export type VinetaMinOrderByAggregateInput = {
    id?: SortOrder
    comentario?: SortOrder
    mediaResourceId?: SortOrder
  }

  export type DispositivoCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<DispositivoCreateWithoutUsuarioInput, DispositivoUncheckedCreateWithoutUsuarioInput> | DispositivoCreateWithoutUsuarioInput[] | DispositivoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: DispositivoCreateOrConnectWithoutUsuarioInput | DispositivoCreateOrConnectWithoutUsuarioInput[]
    createMany?: DispositivoCreateManyUsuarioInputEnvelope
    connect?: DispositivoWhereUniqueInput | DispositivoWhereUniqueInput[]
  }

  export type DispositivoUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<DispositivoCreateWithoutUsuarioInput, DispositivoUncheckedCreateWithoutUsuarioInput> | DispositivoCreateWithoutUsuarioInput[] | DispositivoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: DispositivoCreateOrConnectWithoutUsuarioInput | DispositivoCreateOrConnectWithoutUsuarioInput[]
    createMany?: DispositivoCreateManyUsuarioInputEnvelope
    connect?: DispositivoWhereUniqueInput | DispositivoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DispositivoUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<DispositivoCreateWithoutUsuarioInput, DispositivoUncheckedCreateWithoutUsuarioInput> | DispositivoCreateWithoutUsuarioInput[] | DispositivoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: DispositivoCreateOrConnectWithoutUsuarioInput | DispositivoCreateOrConnectWithoutUsuarioInput[]
    upsert?: DispositivoUpsertWithWhereUniqueWithoutUsuarioInput | DispositivoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: DispositivoCreateManyUsuarioInputEnvelope
    set?: DispositivoWhereUniqueInput | DispositivoWhereUniqueInput[]
    disconnect?: DispositivoWhereUniqueInput | DispositivoWhereUniqueInput[]
    delete?: DispositivoWhereUniqueInput | DispositivoWhereUniqueInput[]
    connect?: DispositivoWhereUniqueInput | DispositivoWhereUniqueInput[]
    update?: DispositivoUpdateWithWhereUniqueWithoutUsuarioInput | DispositivoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: DispositivoUpdateManyWithWhereWithoutUsuarioInput | DispositivoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: DispositivoScalarWhereInput | DispositivoScalarWhereInput[]
  }

  export type DispositivoUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<DispositivoCreateWithoutUsuarioInput, DispositivoUncheckedCreateWithoutUsuarioInput> | DispositivoCreateWithoutUsuarioInput[] | DispositivoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: DispositivoCreateOrConnectWithoutUsuarioInput | DispositivoCreateOrConnectWithoutUsuarioInput[]
    upsert?: DispositivoUpsertWithWhereUniqueWithoutUsuarioInput | DispositivoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: DispositivoCreateManyUsuarioInputEnvelope
    set?: DispositivoWhereUniqueInput | DispositivoWhereUniqueInput[]
    disconnect?: DispositivoWhereUniqueInput | DispositivoWhereUniqueInput[]
    delete?: DispositivoWhereUniqueInput | DispositivoWhereUniqueInput[]
    connect?: DispositivoWhereUniqueInput | DispositivoWhereUniqueInput[]
    update?: DispositivoUpdateWithWhereUniqueWithoutUsuarioInput | DispositivoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: DispositivoUpdateManyWithWhereWithoutUsuarioInput | DispositivoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: DispositivoScalarWhereInput | DispositivoScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutDispositivosInput = {
    create?: XOR<UsuarioCreateWithoutDispositivosInput, UsuarioUncheckedCreateWithoutDispositivosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutDispositivosInput
    connect?: UsuarioWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UsuarioUpdateOneRequiredWithoutDispositivosNestedInput = {
    create?: XOR<UsuarioCreateWithoutDispositivosInput, UsuarioUncheckedCreateWithoutDispositivosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutDispositivosInput
    upsert?: UsuarioUpsertWithoutDispositivosInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutDispositivosInput, UsuarioUpdateWithoutDispositivosInput>, UsuarioUncheckedUpdateWithoutDispositivosInput>
  }

  export type CategoriaCreateNestedManyWithoutMediaResourceInput = {
    create?: XOR<CategoriaCreateWithoutMediaResourceInput, CategoriaUncheckedCreateWithoutMediaResourceInput> | CategoriaCreateWithoutMediaResourceInput[] | CategoriaUncheckedCreateWithoutMediaResourceInput[]
    connectOrCreate?: CategoriaCreateOrConnectWithoutMediaResourceInput | CategoriaCreateOrConnectWithoutMediaResourceInput[]
    createMany?: CategoriaCreateManyMediaResourceInputEnvelope
    connect?: CategoriaWhereUniqueInput | CategoriaWhereUniqueInput[]
  }

  export type EnlaceCreateNestedManyWithoutMediaResourceInput = {
    create?: XOR<EnlaceCreateWithoutMediaResourceInput, EnlaceUncheckedCreateWithoutMediaResourceInput> | EnlaceCreateWithoutMediaResourceInput[] | EnlaceUncheckedCreateWithoutMediaResourceInput[]
    connectOrCreate?: EnlaceCreateOrConnectWithoutMediaResourceInput | EnlaceCreateOrConnectWithoutMediaResourceInput[]
    createMany?: EnlaceCreateManyMediaResourceInputEnvelope
    connect?: EnlaceWhereUniqueInput | EnlaceWhereUniqueInput[]
  }

  export type VinetaCreateNestedManyWithoutMediaResourceInput = {
    create?: XOR<VinetaCreateWithoutMediaResourceInput, VinetaUncheckedCreateWithoutMediaResourceInput> | VinetaCreateWithoutMediaResourceInput[] | VinetaUncheckedCreateWithoutMediaResourceInput[]
    connectOrCreate?: VinetaCreateOrConnectWithoutMediaResourceInput | VinetaCreateOrConnectWithoutMediaResourceInput[]
    createMany?: VinetaCreateManyMediaResourceInputEnvelope
    connect?: VinetaWhereUniqueInput | VinetaWhereUniqueInput[]
  }

  export type CategoriaUncheckedCreateNestedManyWithoutMediaResourceInput = {
    create?: XOR<CategoriaCreateWithoutMediaResourceInput, CategoriaUncheckedCreateWithoutMediaResourceInput> | CategoriaCreateWithoutMediaResourceInput[] | CategoriaUncheckedCreateWithoutMediaResourceInput[]
    connectOrCreate?: CategoriaCreateOrConnectWithoutMediaResourceInput | CategoriaCreateOrConnectWithoutMediaResourceInput[]
    createMany?: CategoriaCreateManyMediaResourceInputEnvelope
    connect?: CategoriaWhereUniqueInput | CategoriaWhereUniqueInput[]
  }

  export type EnlaceUncheckedCreateNestedManyWithoutMediaResourceInput = {
    create?: XOR<EnlaceCreateWithoutMediaResourceInput, EnlaceUncheckedCreateWithoutMediaResourceInput> | EnlaceCreateWithoutMediaResourceInput[] | EnlaceUncheckedCreateWithoutMediaResourceInput[]
    connectOrCreate?: EnlaceCreateOrConnectWithoutMediaResourceInput | EnlaceCreateOrConnectWithoutMediaResourceInput[]
    createMany?: EnlaceCreateManyMediaResourceInputEnvelope
    connect?: EnlaceWhereUniqueInput | EnlaceWhereUniqueInput[]
  }

  export type VinetaUncheckedCreateNestedManyWithoutMediaResourceInput = {
    create?: XOR<VinetaCreateWithoutMediaResourceInput, VinetaUncheckedCreateWithoutMediaResourceInput> | VinetaCreateWithoutMediaResourceInput[] | VinetaUncheckedCreateWithoutMediaResourceInput[]
    connectOrCreate?: VinetaCreateOrConnectWithoutMediaResourceInput | VinetaCreateOrConnectWithoutMediaResourceInput[]
    createMany?: VinetaCreateManyMediaResourceInputEnvelope
    connect?: VinetaWhereUniqueInput | VinetaWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CategoriaUpdateManyWithoutMediaResourceNestedInput = {
    create?: XOR<CategoriaCreateWithoutMediaResourceInput, CategoriaUncheckedCreateWithoutMediaResourceInput> | CategoriaCreateWithoutMediaResourceInput[] | CategoriaUncheckedCreateWithoutMediaResourceInput[]
    connectOrCreate?: CategoriaCreateOrConnectWithoutMediaResourceInput | CategoriaCreateOrConnectWithoutMediaResourceInput[]
    upsert?: CategoriaUpsertWithWhereUniqueWithoutMediaResourceInput | CategoriaUpsertWithWhereUniqueWithoutMediaResourceInput[]
    createMany?: CategoriaCreateManyMediaResourceInputEnvelope
    set?: CategoriaWhereUniqueInput | CategoriaWhereUniqueInput[]
    disconnect?: CategoriaWhereUniqueInput | CategoriaWhereUniqueInput[]
    delete?: CategoriaWhereUniqueInput | CategoriaWhereUniqueInput[]
    connect?: CategoriaWhereUniqueInput | CategoriaWhereUniqueInput[]
    update?: CategoriaUpdateWithWhereUniqueWithoutMediaResourceInput | CategoriaUpdateWithWhereUniqueWithoutMediaResourceInput[]
    updateMany?: CategoriaUpdateManyWithWhereWithoutMediaResourceInput | CategoriaUpdateManyWithWhereWithoutMediaResourceInput[]
    deleteMany?: CategoriaScalarWhereInput | CategoriaScalarWhereInput[]
  }

  export type EnlaceUpdateManyWithoutMediaResourceNestedInput = {
    create?: XOR<EnlaceCreateWithoutMediaResourceInput, EnlaceUncheckedCreateWithoutMediaResourceInput> | EnlaceCreateWithoutMediaResourceInput[] | EnlaceUncheckedCreateWithoutMediaResourceInput[]
    connectOrCreate?: EnlaceCreateOrConnectWithoutMediaResourceInput | EnlaceCreateOrConnectWithoutMediaResourceInput[]
    upsert?: EnlaceUpsertWithWhereUniqueWithoutMediaResourceInput | EnlaceUpsertWithWhereUniqueWithoutMediaResourceInput[]
    createMany?: EnlaceCreateManyMediaResourceInputEnvelope
    set?: EnlaceWhereUniqueInput | EnlaceWhereUniqueInput[]
    disconnect?: EnlaceWhereUniqueInput | EnlaceWhereUniqueInput[]
    delete?: EnlaceWhereUniqueInput | EnlaceWhereUniqueInput[]
    connect?: EnlaceWhereUniqueInput | EnlaceWhereUniqueInput[]
    update?: EnlaceUpdateWithWhereUniqueWithoutMediaResourceInput | EnlaceUpdateWithWhereUniqueWithoutMediaResourceInput[]
    updateMany?: EnlaceUpdateManyWithWhereWithoutMediaResourceInput | EnlaceUpdateManyWithWhereWithoutMediaResourceInput[]
    deleteMany?: EnlaceScalarWhereInput | EnlaceScalarWhereInput[]
  }

  export type VinetaUpdateManyWithoutMediaResourceNestedInput = {
    create?: XOR<VinetaCreateWithoutMediaResourceInput, VinetaUncheckedCreateWithoutMediaResourceInput> | VinetaCreateWithoutMediaResourceInput[] | VinetaUncheckedCreateWithoutMediaResourceInput[]
    connectOrCreate?: VinetaCreateOrConnectWithoutMediaResourceInput | VinetaCreateOrConnectWithoutMediaResourceInput[]
    upsert?: VinetaUpsertWithWhereUniqueWithoutMediaResourceInput | VinetaUpsertWithWhereUniqueWithoutMediaResourceInput[]
    createMany?: VinetaCreateManyMediaResourceInputEnvelope
    set?: VinetaWhereUniqueInput | VinetaWhereUniqueInput[]
    disconnect?: VinetaWhereUniqueInput | VinetaWhereUniqueInput[]
    delete?: VinetaWhereUniqueInput | VinetaWhereUniqueInput[]
    connect?: VinetaWhereUniqueInput | VinetaWhereUniqueInput[]
    update?: VinetaUpdateWithWhereUniqueWithoutMediaResourceInput | VinetaUpdateWithWhereUniqueWithoutMediaResourceInput[]
    updateMany?: VinetaUpdateManyWithWhereWithoutMediaResourceInput | VinetaUpdateManyWithWhereWithoutMediaResourceInput[]
    deleteMany?: VinetaScalarWhereInput | VinetaScalarWhereInput[]
  }

  export type CategoriaUncheckedUpdateManyWithoutMediaResourceNestedInput = {
    create?: XOR<CategoriaCreateWithoutMediaResourceInput, CategoriaUncheckedCreateWithoutMediaResourceInput> | CategoriaCreateWithoutMediaResourceInput[] | CategoriaUncheckedCreateWithoutMediaResourceInput[]
    connectOrCreate?: CategoriaCreateOrConnectWithoutMediaResourceInput | CategoriaCreateOrConnectWithoutMediaResourceInput[]
    upsert?: CategoriaUpsertWithWhereUniqueWithoutMediaResourceInput | CategoriaUpsertWithWhereUniqueWithoutMediaResourceInput[]
    createMany?: CategoriaCreateManyMediaResourceInputEnvelope
    set?: CategoriaWhereUniqueInput | CategoriaWhereUniqueInput[]
    disconnect?: CategoriaWhereUniqueInput | CategoriaWhereUniqueInput[]
    delete?: CategoriaWhereUniqueInput | CategoriaWhereUniqueInput[]
    connect?: CategoriaWhereUniqueInput | CategoriaWhereUniqueInput[]
    update?: CategoriaUpdateWithWhereUniqueWithoutMediaResourceInput | CategoriaUpdateWithWhereUniqueWithoutMediaResourceInput[]
    updateMany?: CategoriaUpdateManyWithWhereWithoutMediaResourceInput | CategoriaUpdateManyWithWhereWithoutMediaResourceInput[]
    deleteMany?: CategoriaScalarWhereInput | CategoriaScalarWhereInput[]
  }

  export type EnlaceUncheckedUpdateManyWithoutMediaResourceNestedInput = {
    create?: XOR<EnlaceCreateWithoutMediaResourceInput, EnlaceUncheckedCreateWithoutMediaResourceInput> | EnlaceCreateWithoutMediaResourceInput[] | EnlaceUncheckedCreateWithoutMediaResourceInput[]
    connectOrCreate?: EnlaceCreateOrConnectWithoutMediaResourceInput | EnlaceCreateOrConnectWithoutMediaResourceInput[]
    upsert?: EnlaceUpsertWithWhereUniqueWithoutMediaResourceInput | EnlaceUpsertWithWhereUniqueWithoutMediaResourceInput[]
    createMany?: EnlaceCreateManyMediaResourceInputEnvelope
    set?: EnlaceWhereUniqueInput | EnlaceWhereUniqueInput[]
    disconnect?: EnlaceWhereUniqueInput | EnlaceWhereUniqueInput[]
    delete?: EnlaceWhereUniqueInput | EnlaceWhereUniqueInput[]
    connect?: EnlaceWhereUniqueInput | EnlaceWhereUniqueInput[]
    update?: EnlaceUpdateWithWhereUniqueWithoutMediaResourceInput | EnlaceUpdateWithWhereUniqueWithoutMediaResourceInput[]
    updateMany?: EnlaceUpdateManyWithWhereWithoutMediaResourceInput | EnlaceUpdateManyWithWhereWithoutMediaResourceInput[]
    deleteMany?: EnlaceScalarWhereInput | EnlaceScalarWhereInput[]
  }

  export type VinetaUncheckedUpdateManyWithoutMediaResourceNestedInput = {
    create?: XOR<VinetaCreateWithoutMediaResourceInput, VinetaUncheckedCreateWithoutMediaResourceInput> | VinetaCreateWithoutMediaResourceInput[] | VinetaUncheckedCreateWithoutMediaResourceInput[]
    connectOrCreate?: VinetaCreateOrConnectWithoutMediaResourceInput | VinetaCreateOrConnectWithoutMediaResourceInput[]
    upsert?: VinetaUpsertWithWhereUniqueWithoutMediaResourceInput | VinetaUpsertWithWhereUniqueWithoutMediaResourceInput[]
    createMany?: VinetaCreateManyMediaResourceInputEnvelope
    set?: VinetaWhereUniqueInput | VinetaWhereUniqueInput[]
    disconnect?: VinetaWhereUniqueInput | VinetaWhereUniqueInput[]
    delete?: VinetaWhereUniqueInput | VinetaWhereUniqueInput[]
    connect?: VinetaWhereUniqueInput | VinetaWhereUniqueInput[]
    update?: VinetaUpdateWithWhereUniqueWithoutMediaResourceInput | VinetaUpdateWithWhereUniqueWithoutMediaResourceInput[]
    updateMany?: VinetaUpdateManyWithWhereWithoutMediaResourceInput | VinetaUpdateManyWithWhereWithoutMediaResourceInput[]
    deleteMany?: VinetaScalarWhereInput | VinetaScalarWhereInput[]
  }

  export type MediaResourceCreateNestedOneWithoutCategoriasInput = {
    create?: XOR<MediaResourceCreateWithoutCategoriasInput, MediaResourceUncheckedCreateWithoutCategoriasInput>
    connectOrCreate?: MediaResourceCreateOrConnectWithoutCategoriasInput
    connect?: MediaResourceWhereUniqueInput
  }

  export type MediaResourceUpdateOneRequiredWithoutCategoriasNestedInput = {
    create?: XOR<MediaResourceCreateWithoutCategoriasInput, MediaResourceUncheckedCreateWithoutCategoriasInput>
    connectOrCreate?: MediaResourceCreateOrConnectWithoutCategoriasInput
    upsert?: MediaResourceUpsertWithoutCategoriasInput
    connect?: MediaResourceWhereUniqueInput
    update?: XOR<XOR<MediaResourceUpdateToOneWithWhereWithoutCategoriasInput, MediaResourceUpdateWithoutCategoriasInput>, MediaResourceUncheckedUpdateWithoutCategoriasInput>
  }

  export type MediaResourceCreateNestedOneWithoutEnlacesInput = {
    create?: XOR<MediaResourceCreateWithoutEnlacesInput, MediaResourceUncheckedCreateWithoutEnlacesInput>
    connectOrCreate?: MediaResourceCreateOrConnectWithoutEnlacesInput
    connect?: MediaResourceWhereUniqueInput
  }

  export type MediaResourceUpdateOneRequiredWithoutEnlacesNestedInput = {
    create?: XOR<MediaResourceCreateWithoutEnlacesInput, MediaResourceUncheckedCreateWithoutEnlacesInput>
    connectOrCreate?: MediaResourceCreateOrConnectWithoutEnlacesInput
    upsert?: MediaResourceUpsertWithoutEnlacesInput
    connect?: MediaResourceWhereUniqueInput
    update?: XOR<XOR<MediaResourceUpdateToOneWithWhereWithoutEnlacesInput, MediaResourceUpdateWithoutEnlacesInput>, MediaResourceUncheckedUpdateWithoutEnlacesInput>
  }

  export type MediaResourceCreateNestedOneWithoutVinetasInput = {
    create?: XOR<MediaResourceCreateWithoutVinetasInput, MediaResourceUncheckedCreateWithoutVinetasInput>
    connectOrCreate?: MediaResourceCreateOrConnectWithoutVinetasInput
    connect?: MediaResourceWhereUniqueInput
  }

  export type MediaResourceUpdateOneRequiredWithoutVinetasNestedInput = {
    create?: XOR<MediaResourceCreateWithoutVinetasInput, MediaResourceUncheckedCreateWithoutVinetasInput>
    connectOrCreate?: MediaResourceCreateOrConnectWithoutVinetasInput
    upsert?: MediaResourceUpsertWithoutVinetasInput
    connect?: MediaResourceWhereUniqueInput
    update?: XOR<XOR<MediaResourceUpdateToOneWithWhereWithoutVinetasInput, MediaResourceUpdateWithoutVinetasInput>, MediaResourceUncheckedUpdateWithoutVinetasInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DispositivoCreateWithoutUsuarioInput = {
    id?: string
    credentialId: string
    publicKey: string
    counter: number
  }

  export type DispositivoUncheckedCreateWithoutUsuarioInput = {
    id?: string
    credentialId: string
    publicKey: string
    counter: number
  }

  export type DispositivoCreateOrConnectWithoutUsuarioInput = {
    where: DispositivoWhereUniqueInput
    create: XOR<DispositivoCreateWithoutUsuarioInput, DispositivoUncheckedCreateWithoutUsuarioInput>
  }

  export type DispositivoCreateManyUsuarioInputEnvelope = {
    data: DispositivoCreateManyUsuarioInput | DispositivoCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type DispositivoUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: DispositivoWhereUniqueInput
    update: XOR<DispositivoUpdateWithoutUsuarioInput, DispositivoUncheckedUpdateWithoutUsuarioInput>
    create: XOR<DispositivoCreateWithoutUsuarioInput, DispositivoUncheckedCreateWithoutUsuarioInput>
  }

  export type DispositivoUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: DispositivoWhereUniqueInput
    data: XOR<DispositivoUpdateWithoutUsuarioInput, DispositivoUncheckedUpdateWithoutUsuarioInput>
  }

  export type DispositivoUpdateManyWithWhereWithoutUsuarioInput = {
    where: DispositivoScalarWhereInput
    data: XOR<DispositivoUpdateManyMutationInput, DispositivoUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type DispositivoScalarWhereInput = {
    AND?: DispositivoScalarWhereInput | DispositivoScalarWhereInput[]
    OR?: DispositivoScalarWhereInput[]
    NOT?: DispositivoScalarWhereInput | DispositivoScalarWhereInput[]
    id?: StringFilter<"Dispositivo"> | string
    credentialId?: StringFilter<"Dispositivo"> | string
    publicKey?: StringFilter<"Dispositivo"> | string
    counter?: IntFilter<"Dispositivo"> | number
    usuarioId?: StringFilter<"Dispositivo"> | string
  }

  export type UsuarioCreateWithoutDispositivosInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
  }

  export type UsuarioUncheckedCreateWithoutDispositivosInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
  }

  export type UsuarioCreateOrConnectWithoutDispositivosInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutDispositivosInput, UsuarioUncheckedCreateWithoutDispositivosInput>
  }

  export type UsuarioUpsertWithoutDispositivosInput = {
    update: XOR<UsuarioUpdateWithoutDispositivosInput, UsuarioUncheckedUpdateWithoutDispositivosInput>
    create: XOR<UsuarioCreateWithoutDispositivosInput, UsuarioUncheckedCreateWithoutDispositivosInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutDispositivosInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutDispositivosInput, UsuarioUncheckedUpdateWithoutDispositivosInput>
  }

  export type UsuarioUpdateWithoutDispositivosInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateWithoutDispositivosInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriaCreateWithoutMediaResourceInput = {
    id?: string
    nombre: string
  }

  export type CategoriaUncheckedCreateWithoutMediaResourceInput = {
    id?: string
    nombre: string
  }

  export type CategoriaCreateOrConnectWithoutMediaResourceInput = {
    where: CategoriaWhereUniqueInput
    create: XOR<CategoriaCreateWithoutMediaResourceInput, CategoriaUncheckedCreateWithoutMediaResourceInput>
  }

  export type CategoriaCreateManyMediaResourceInputEnvelope = {
    data: CategoriaCreateManyMediaResourceInput | CategoriaCreateManyMediaResourceInput[]
    skipDuplicates?: boolean
  }

  export type EnlaceCreateWithoutMediaResourceInput = {
    id?: string
    tipo: string
    url: string
  }

  export type EnlaceUncheckedCreateWithoutMediaResourceInput = {
    id?: string
    tipo: string
    url: string
  }

  export type EnlaceCreateOrConnectWithoutMediaResourceInput = {
    where: EnlaceWhereUniqueInput
    create: XOR<EnlaceCreateWithoutMediaResourceInput, EnlaceUncheckedCreateWithoutMediaResourceInput>
  }

  export type EnlaceCreateManyMediaResourceInputEnvelope = {
    data: EnlaceCreateManyMediaResourceInput | EnlaceCreateManyMediaResourceInput[]
    skipDuplicates?: boolean
  }

  export type VinetaCreateWithoutMediaResourceInput = {
    id?: string
    comentario: string
  }

  export type VinetaUncheckedCreateWithoutMediaResourceInput = {
    id?: string
    comentario: string
  }

  export type VinetaCreateOrConnectWithoutMediaResourceInput = {
    where: VinetaWhereUniqueInput
    create: XOR<VinetaCreateWithoutMediaResourceInput, VinetaUncheckedCreateWithoutMediaResourceInput>
  }

  export type VinetaCreateManyMediaResourceInputEnvelope = {
    data: VinetaCreateManyMediaResourceInput | VinetaCreateManyMediaResourceInput[]
    skipDuplicates?: boolean
  }

  export type CategoriaUpsertWithWhereUniqueWithoutMediaResourceInput = {
    where: CategoriaWhereUniqueInput
    update: XOR<CategoriaUpdateWithoutMediaResourceInput, CategoriaUncheckedUpdateWithoutMediaResourceInput>
    create: XOR<CategoriaCreateWithoutMediaResourceInput, CategoriaUncheckedCreateWithoutMediaResourceInput>
  }

  export type CategoriaUpdateWithWhereUniqueWithoutMediaResourceInput = {
    where: CategoriaWhereUniqueInput
    data: XOR<CategoriaUpdateWithoutMediaResourceInput, CategoriaUncheckedUpdateWithoutMediaResourceInput>
  }

  export type CategoriaUpdateManyWithWhereWithoutMediaResourceInput = {
    where: CategoriaScalarWhereInput
    data: XOR<CategoriaUpdateManyMutationInput, CategoriaUncheckedUpdateManyWithoutMediaResourceInput>
  }

  export type CategoriaScalarWhereInput = {
    AND?: CategoriaScalarWhereInput | CategoriaScalarWhereInput[]
    OR?: CategoriaScalarWhereInput[]
    NOT?: CategoriaScalarWhereInput | CategoriaScalarWhereInput[]
    id?: StringFilter<"Categoria"> | string
    nombre?: StringFilter<"Categoria"> | string
    mediaResourceId?: StringFilter<"Categoria"> | string
  }

  export type EnlaceUpsertWithWhereUniqueWithoutMediaResourceInput = {
    where: EnlaceWhereUniqueInput
    update: XOR<EnlaceUpdateWithoutMediaResourceInput, EnlaceUncheckedUpdateWithoutMediaResourceInput>
    create: XOR<EnlaceCreateWithoutMediaResourceInput, EnlaceUncheckedCreateWithoutMediaResourceInput>
  }

  export type EnlaceUpdateWithWhereUniqueWithoutMediaResourceInput = {
    where: EnlaceWhereUniqueInput
    data: XOR<EnlaceUpdateWithoutMediaResourceInput, EnlaceUncheckedUpdateWithoutMediaResourceInput>
  }

  export type EnlaceUpdateManyWithWhereWithoutMediaResourceInput = {
    where: EnlaceScalarWhereInput
    data: XOR<EnlaceUpdateManyMutationInput, EnlaceUncheckedUpdateManyWithoutMediaResourceInput>
  }

  export type EnlaceScalarWhereInput = {
    AND?: EnlaceScalarWhereInput | EnlaceScalarWhereInput[]
    OR?: EnlaceScalarWhereInput[]
    NOT?: EnlaceScalarWhereInput | EnlaceScalarWhereInput[]
    id?: StringFilter<"Enlace"> | string
    tipo?: StringFilter<"Enlace"> | string
    url?: StringFilter<"Enlace"> | string
    mediaResourceId?: StringFilter<"Enlace"> | string
  }

  export type VinetaUpsertWithWhereUniqueWithoutMediaResourceInput = {
    where: VinetaWhereUniqueInput
    update: XOR<VinetaUpdateWithoutMediaResourceInput, VinetaUncheckedUpdateWithoutMediaResourceInput>
    create: XOR<VinetaCreateWithoutMediaResourceInput, VinetaUncheckedCreateWithoutMediaResourceInput>
  }

  export type VinetaUpdateWithWhereUniqueWithoutMediaResourceInput = {
    where: VinetaWhereUniqueInput
    data: XOR<VinetaUpdateWithoutMediaResourceInput, VinetaUncheckedUpdateWithoutMediaResourceInput>
  }

  export type VinetaUpdateManyWithWhereWithoutMediaResourceInput = {
    where: VinetaScalarWhereInput
    data: XOR<VinetaUpdateManyMutationInput, VinetaUncheckedUpdateManyWithoutMediaResourceInput>
  }

  export type VinetaScalarWhereInput = {
    AND?: VinetaScalarWhereInput | VinetaScalarWhereInput[]
    OR?: VinetaScalarWhereInput[]
    NOT?: VinetaScalarWhereInput | VinetaScalarWhereInput[]
    id?: StringFilter<"Vineta"> | string
    comentario?: StringFilter<"Vineta"> | string
    mediaResourceId?: StringFilter<"Vineta"> | string
  }

  export type MediaResourceCreateWithoutCategoriasInput = {
    id?: string
    imagenPrincipalUrl: string
    nombre: string
    descripcion: string
    instituto?: string | null
    miniaturaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    enlaces?: EnlaceCreateNestedManyWithoutMediaResourceInput
    vinetas?: VinetaCreateNestedManyWithoutMediaResourceInput
  }

  export type MediaResourceUncheckedCreateWithoutCategoriasInput = {
    id?: string
    imagenPrincipalUrl: string
    nombre: string
    descripcion: string
    instituto?: string | null
    miniaturaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    enlaces?: EnlaceUncheckedCreateNestedManyWithoutMediaResourceInput
    vinetas?: VinetaUncheckedCreateNestedManyWithoutMediaResourceInput
  }

  export type MediaResourceCreateOrConnectWithoutCategoriasInput = {
    where: MediaResourceWhereUniqueInput
    create: XOR<MediaResourceCreateWithoutCategoriasInput, MediaResourceUncheckedCreateWithoutCategoriasInput>
  }

  export type MediaResourceUpsertWithoutCategoriasInput = {
    update: XOR<MediaResourceUpdateWithoutCategoriasInput, MediaResourceUncheckedUpdateWithoutCategoriasInput>
    create: XOR<MediaResourceCreateWithoutCategoriasInput, MediaResourceUncheckedCreateWithoutCategoriasInput>
    where?: MediaResourceWhereInput
  }

  export type MediaResourceUpdateToOneWithWhereWithoutCategoriasInput = {
    where?: MediaResourceWhereInput
    data: XOR<MediaResourceUpdateWithoutCategoriasInput, MediaResourceUncheckedUpdateWithoutCategoriasInput>
  }

  export type MediaResourceUpdateWithoutCategoriasInput = {
    id?: StringFieldUpdateOperationsInput | string
    imagenPrincipalUrl?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    instituto?: NullableStringFieldUpdateOperationsInput | string | null
    miniaturaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enlaces?: EnlaceUpdateManyWithoutMediaResourceNestedInput
    vinetas?: VinetaUpdateManyWithoutMediaResourceNestedInput
  }

  export type MediaResourceUncheckedUpdateWithoutCategoriasInput = {
    id?: StringFieldUpdateOperationsInput | string
    imagenPrincipalUrl?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    instituto?: NullableStringFieldUpdateOperationsInput | string | null
    miniaturaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enlaces?: EnlaceUncheckedUpdateManyWithoutMediaResourceNestedInput
    vinetas?: VinetaUncheckedUpdateManyWithoutMediaResourceNestedInput
  }

  export type MediaResourceCreateWithoutEnlacesInput = {
    id?: string
    imagenPrincipalUrl: string
    nombre: string
    descripcion: string
    instituto?: string | null
    miniaturaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categorias?: CategoriaCreateNestedManyWithoutMediaResourceInput
    vinetas?: VinetaCreateNestedManyWithoutMediaResourceInput
  }

  export type MediaResourceUncheckedCreateWithoutEnlacesInput = {
    id?: string
    imagenPrincipalUrl: string
    nombre: string
    descripcion: string
    instituto?: string | null
    miniaturaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categorias?: CategoriaUncheckedCreateNestedManyWithoutMediaResourceInput
    vinetas?: VinetaUncheckedCreateNestedManyWithoutMediaResourceInput
  }

  export type MediaResourceCreateOrConnectWithoutEnlacesInput = {
    where: MediaResourceWhereUniqueInput
    create: XOR<MediaResourceCreateWithoutEnlacesInput, MediaResourceUncheckedCreateWithoutEnlacesInput>
  }

  export type MediaResourceUpsertWithoutEnlacesInput = {
    update: XOR<MediaResourceUpdateWithoutEnlacesInput, MediaResourceUncheckedUpdateWithoutEnlacesInput>
    create: XOR<MediaResourceCreateWithoutEnlacesInput, MediaResourceUncheckedCreateWithoutEnlacesInput>
    where?: MediaResourceWhereInput
  }

  export type MediaResourceUpdateToOneWithWhereWithoutEnlacesInput = {
    where?: MediaResourceWhereInput
    data: XOR<MediaResourceUpdateWithoutEnlacesInput, MediaResourceUncheckedUpdateWithoutEnlacesInput>
  }

  export type MediaResourceUpdateWithoutEnlacesInput = {
    id?: StringFieldUpdateOperationsInput | string
    imagenPrincipalUrl?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    instituto?: NullableStringFieldUpdateOperationsInput | string | null
    miniaturaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUpdateManyWithoutMediaResourceNestedInput
    vinetas?: VinetaUpdateManyWithoutMediaResourceNestedInput
  }

  export type MediaResourceUncheckedUpdateWithoutEnlacesInput = {
    id?: StringFieldUpdateOperationsInput | string
    imagenPrincipalUrl?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    instituto?: NullableStringFieldUpdateOperationsInput | string | null
    miniaturaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUncheckedUpdateManyWithoutMediaResourceNestedInput
    vinetas?: VinetaUncheckedUpdateManyWithoutMediaResourceNestedInput
  }

  export type MediaResourceCreateWithoutVinetasInput = {
    id?: string
    imagenPrincipalUrl: string
    nombre: string
    descripcion: string
    instituto?: string | null
    miniaturaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categorias?: CategoriaCreateNestedManyWithoutMediaResourceInput
    enlaces?: EnlaceCreateNestedManyWithoutMediaResourceInput
  }

  export type MediaResourceUncheckedCreateWithoutVinetasInput = {
    id?: string
    imagenPrincipalUrl: string
    nombre: string
    descripcion: string
    instituto?: string | null
    miniaturaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categorias?: CategoriaUncheckedCreateNestedManyWithoutMediaResourceInput
    enlaces?: EnlaceUncheckedCreateNestedManyWithoutMediaResourceInput
  }

  export type MediaResourceCreateOrConnectWithoutVinetasInput = {
    where: MediaResourceWhereUniqueInput
    create: XOR<MediaResourceCreateWithoutVinetasInput, MediaResourceUncheckedCreateWithoutVinetasInput>
  }

  export type MediaResourceUpsertWithoutVinetasInput = {
    update: XOR<MediaResourceUpdateWithoutVinetasInput, MediaResourceUncheckedUpdateWithoutVinetasInput>
    create: XOR<MediaResourceCreateWithoutVinetasInput, MediaResourceUncheckedCreateWithoutVinetasInput>
    where?: MediaResourceWhereInput
  }

  export type MediaResourceUpdateToOneWithWhereWithoutVinetasInput = {
    where?: MediaResourceWhereInput
    data: XOR<MediaResourceUpdateWithoutVinetasInput, MediaResourceUncheckedUpdateWithoutVinetasInput>
  }

  export type MediaResourceUpdateWithoutVinetasInput = {
    id?: StringFieldUpdateOperationsInput | string
    imagenPrincipalUrl?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    instituto?: NullableStringFieldUpdateOperationsInput | string | null
    miniaturaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUpdateManyWithoutMediaResourceNestedInput
    enlaces?: EnlaceUpdateManyWithoutMediaResourceNestedInput
  }

  export type MediaResourceUncheckedUpdateWithoutVinetasInput = {
    id?: StringFieldUpdateOperationsInput | string
    imagenPrincipalUrl?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    instituto?: NullableStringFieldUpdateOperationsInput | string | null
    miniaturaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUncheckedUpdateManyWithoutMediaResourceNestedInput
    enlaces?: EnlaceUncheckedUpdateManyWithoutMediaResourceNestedInput
  }

  export type DispositivoCreateManyUsuarioInput = {
    id?: string
    credentialId: string
    publicKey: string
    counter: number
  }

  export type DispositivoUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    credentialId?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
  }

  export type DispositivoUncheckedUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    credentialId?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
  }

  export type DispositivoUncheckedUpdateManyWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    credentialId?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
  }

  export type CategoriaCreateManyMediaResourceInput = {
    id?: string
    nombre: string
  }

  export type EnlaceCreateManyMediaResourceInput = {
    id?: string
    tipo: string
    url: string
  }

  export type VinetaCreateManyMediaResourceInput = {
    id?: string
    comentario: string
  }

  export type CategoriaUpdateWithoutMediaResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type CategoriaUncheckedUpdateWithoutMediaResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type CategoriaUncheckedUpdateManyWithoutMediaResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type EnlaceUpdateWithoutMediaResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type EnlaceUncheckedUpdateWithoutMediaResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type EnlaceUncheckedUpdateManyWithoutMediaResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type VinetaUpdateWithoutMediaResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    comentario?: StringFieldUpdateOperationsInput | string
  }

  export type VinetaUncheckedUpdateWithoutMediaResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    comentario?: StringFieldUpdateOperationsInput | string
  }

  export type VinetaUncheckedUpdateManyWithoutMediaResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    comentario?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}