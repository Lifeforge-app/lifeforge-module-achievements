export interface EntriesCreateInputBody {
  title: string;
  thoughts: string;
  difficulty: "easy" | "medium" | "hard" | "impossible";
  category?: string | null;
}

export interface EntriesDifficultiesCountOutputOK {
  [k: string]: number;
}

export interface EntriesListInputQuery {
  difficulty?: ("easy" | "medium" | "hard" | "impossible") | null;
  category?: string;
  query?: string;
}

export interface EntriesRemoveInputQuery {
  id: string;
}

export interface EntriesUpdateInputQuery {
  id: string;
}

export interface CategoriesCreateInputBody {
  name: string;
  icon: string;
  color: string;
}

export type CategoriesListOutputOK = {
  id: string;
  name: string;
  color: string;
  icon: string;
  amount: number;
}[];

export interface CategoriesRemoveInputQuery {
  id: string;
}

export interface CategoriesUpdateInputQuery {
  id: string;
}

export type EntriesListOutputOK = {
  id: string;
  title: string;
  thoughts: string;
  difficulty: "easy" | "medium" | "hard" | "impossible";
  created: string;
  updated: string;
  category?: string | null;
}[];

export interface EntriesUpdateInputBody {
  title: string;
  thoughts: string;
  difficulty: "easy" | "medium" | "hard" | "impossible";
  category?: string | null;
}

export interface CategoriesUpdateInputBody {
  name: string;
  icon: string;
  color: string;
}

export type Contract = {
  readonly "entries": {
  readonly "create": {
  readonly method: "post"
  readonly input: { readonly body?: EntriesCreateInputBody }
  readonly output: { readonly NO_CONTENT: void }
  readonly media: null
}
  readonly "difficultiesCount": {
  readonly method: "get"
  readonly input: {  }
  readonly output: { readonly OK: EntriesDifficultiesCountOutputOK }
  readonly media: null
}
  readonly "list": {
  readonly method: "get"
  readonly input: { readonly query?: EntriesListInputQuery }
  readonly output: { readonly OK: EntriesListOutputOK }
  readonly media: null
}
  readonly "remove": {
  readonly method: "post"
  readonly input: { readonly query?: EntriesRemoveInputQuery }
  readonly output: { readonly NO_CONTENT: void }
  readonly media: null
}
  readonly "update": {
  readonly method: "post"
  readonly input: { readonly query?: EntriesUpdateInputQuery; readonly body?: EntriesUpdateInputBody }
  readonly output: { readonly NO_CONTENT: void }
  readonly media: null
}
}
  readonly "categories": {
  readonly "create": {
  readonly method: "post"
  readonly input: { readonly body?: CategoriesCreateInputBody }
  readonly output: { readonly NO_CONTENT: void }
  readonly media: null
}
  readonly "list": {
  readonly method: "get"
  readonly input: {  }
  readonly output: { readonly OK: CategoriesListOutputOK }
  readonly media: null
}
  readonly "remove": {
  readonly method: "post"
  readonly input: { readonly query?: CategoriesRemoveInputQuery }
  readonly output: { readonly NO_CONTENT: void }
  readonly media: null
}
  readonly "update": {
  readonly method: "post"
  readonly input: { readonly query?: CategoriesUpdateInputQuery; readonly body?: CategoriesUpdateInputBody }
  readonly output: { readonly NO_CONTENT: void }
  readonly media: null
}
}
}
