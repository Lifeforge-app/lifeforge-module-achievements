export type EndpointEntriesCreate_OutputNO_CONTENT = void;
export type EndpointEntriesList_OutputOK = {
  id: string;
  title: string;
  thoughts: string;
  difficulty: "easy" | "medium" | "hard" | "impossible";
  created: string;
  updated: string;
  category?: string | null;
}[];
export type EndpointEntriesRemove_OutputNO_CONTENT = void;
export type EndpointEntriesUpdate_OutputNO_CONTENT = void;
export type EndpointCategoriesCreate_OutputNO_CONTENT = void;
export type EndpointCategoriesList_OutputOK = {
  id: string;
  name: string;
  color: string;
  icon: string;
  amount: number;
}[];
export type EndpointCategoriesRemove_OutputNO_CONTENT = void;
export type EndpointCategoriesUpdate_OutputNO_CONTENT = void;

export interface Contract {
  entries: {
    create: EndpointEntriesCreate;
    difficultiesCount: EndpointEntriesDifficultiesCount;
    list: EndpointEntriesList;
    remove: EndpointEntriesRemove;
    update: EndpointEntriesUpdate;
  };
  categories: {
    create: EndpointCategoriesCreate;
    list: EndpointCategoriesList;
    remove: EndpointCategoriesRemove;
    update: EndpointCategoriesUpdate;
  };
}
export interface EndpointEntriesCreate {
  method: "post";
  input: {
    body?: EndpointEntriesCreate_InputBody;
  };
  output: {
    NO_CONTENT: EndpointEntriesCreate_OutputNO_CONTENT;
  };
  media: null;
}
export interface EndpointEntriesCreate_InputBody {
  title: string;
  thoughts: string;
  difficulty: "easy" | "medium" | "hard" | "impossible";
  category?: string | null;
}
export interface EndpointEntriesDifficultiesCount {
  method: "get";
  input: {};
  output: {
    OK: EndpointEntriesDifficultiesCount_OutputOK;
  };
  media: null;
}
export interface EndpointEntriesDifficultiesCount_OutputOK {
  [k: string]: number;
}
export interface EndpointEntriesList {
  method: "get";
  input: {
    query?: EndpointEntriesList_InputQuery;
  };
  output: {
    OK: EndpointEntriesList_OutputOK;
  };
  media: null;
}
export interface EndpointEntriesList_InputQuery {
  difficulty?: ("easy" | "medium" | "hard" | "impossible") | null;
  category?: string;
  query?: string;
}
export interface EndpointEntriesRemove {
  method: "post";
  input: {
    query?: EndpointEntriesRemove_InputQuery;
  };
  output: {
    NO_CONTENT: EndpointEntriesRemove_OutputNO_CONTENT;
  };
  media: null;
}
export interface EndpointEntriesRemove_InputQuery {
  id: string;
}
export interface EndpointEntriesUpdate {
  method: "post";
  input: {
    query?: EndpointEntriesUpdate_InputQuery;
    body?: EndpointEntriesUpdate_InputBody;
  };
  output: {
    NO_CONTENT: EndpointEntriesUpdate_OutputNO_CONTENT;
  };
  media: null;
}
export interface EndpointEntriesUpdate_InputQuery {
  id: string;
}
export interface EndpointEntriesUpdate_InputBody {
  title: string;
  thoughts: string;
  difficulty: "easy" | "medium" | "hard" | "impossible";
  category?: string | null;
}
export interface EndpointCategoriesCreate {
  method: "post";
  input: {
    body?: EndpointCategoriesCreate_InputBody;
  };
  output: {
    NO_CONTENT: EndpointCategoriesCreate_OutputNO_CONTENT;
  };
  media: null;
}
export interface EndpointCategoriesCreate_InputBody {
  name: string;
  icon: string;
  color: string;
}
export interface EndpointCategoriesList {
  method: "get";
  input: {};
  output: {
    OK: EndpointCategoriesList_OutputOK;
  };
  media: null;
}
export interface EndpointCategoriesRemove {
  method: "post";
  input: {
    query?: EndpointCategoriesRemove_InputQuery;
  };
  output: {
    NO_CONTENT: EndpointCategoriesRemove_OutputNO_CONTENT;
  };
  media: null;
}
export interface EndpointCategoriesRemove_InputQuery {
  id: string;
}
export interface EndpointCategoriesUpdate {
  method: "post";
  input: {
    query?: EndpointCategoriesUpdate_InputQuery;
    body?: EndpointCategoriesUpdate_InputBody;
  };
  output: {
    NO_CONTENT: EndpointCategoriesUpdate_OutputNO_CONTENT;
  };
  media: null;
}
export interface EndpointCategoriesUpdate_InputQuery {
  id: string;
}
export interface EndpointCategoriesUpdate_InputBody {
  name: string;
  icon: string;
  color: string;
}
