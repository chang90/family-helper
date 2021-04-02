/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateListInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  imageKey?: string | null,
};

export type ModelListConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  imageKey?: ModelStringInput | null,
  and?: Array< ModelListConditionInput | null > | null,
  or?: Array< ModelListConditionInput | null > | null,
  not?: ModelListConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type List = {
  __typename: "List",
  id?: string,
  title?: string,
  description?: string | null,
  imageKey?: string | null,
  ListItems?: ModelListItemConnection,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelListItemConnection = {
  __typename: "ModelListItemConnection",
  items?:  Array<ListItem | null > | null,
  nextToken?: string | null,
};

export type ListItem = {
  __typename: "ListItem",
  id?: string,
  title?: string,
  quantity?: number | null,
  done?: boolean | null,
  list?: List,
  actions?: ModelActionConnection,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelActionConnection = {
  __typename: "ModelActionConnection",
  items?:  Array<Action | null > | null,
  nextToken?: string | null,
};

export type Action = {
  __typename: "Action",
  id?: string,
  action?: string | null,
  listItem?: ListItem,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateListInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  imageKey?: string | null,
};

export type DeleteListInput = {
  id?: string | null,
};

export type CreateListItemInput = {
  id?: string | null,
  title: string,
  quantity?: number | null,
  done?: boolean | null,
  listItemListId?: string | null,
};

export type ModelListItemConditionInput = {
  title?: ModelStringInput | null,
  quantity?: ModelIntInput | null,
  done?: ModelBooleanInput | null,
  and?: Array< ModelListItemConditionInput | null > | null,
  or?: Array< ModelListItemConditionInput | null > | null,
  not?: ModelListItemConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateListItemInput = {
  id: string,
  title?: string | null,
  quantity?: number | null,
  done?: boolean | null,
  listItemListId?: string | null,
};

export type DeleteListItemInput = {
  id?: string | null,
};

export type CreateActionInput = {
  id?: string | null,
  action?: string | null,
  actionListItemId?: string | null,
};

export type ModelActionConditionInput = {
  action?: ModelStringInput | null,
  and?: Array< ModelActionConditionInput | null > | null,
  or?: Array< ModelActionConditionInput | null > | null,
  not?: ModelActionConditionInput | null,
};

export type UpdateActionInput = {
  id: string,
  action?: string | null,
  actionListItemId?: string | null,
};

export type DeleteActionInput = {
  id?: string | null,
};

export type ModelListFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  imageKey?: ModelStringInput | null,
  and?: Array< ModelListFilterInput | null > | null,
  or?: Array< ModelListFilterInput | null > | null,
  not?: ModelListFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelListConnection = {
  __typename: "ModelListConnection",
  items?:  Array<List | null > | null,
  nextToken?: string | null,
};

export type ModelListItemFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  quantity?: ModelIntInput | null,
  done?: ModelBooleanInput | null,
  and?: Array< ModelListItemFilterInput | null > | null,
  or?: Array< ModelListItemFilterInput | null > | null,
  not?: ModelListItemFilterInput | null,
};

export type ModelActionFilterInput = {
  id?: ModelIDInput | null,
  action?: ModelStringInput | null,
  and?: Array< ModelActionFilterInput | null > | null,
  or?: Array< ModelActionFilterInput | null > | null,
  not?: ModelActionFilterInput | null,
};

export type CreateListMutationVariables = {
  input?: CreateListInput,
  condition?: ModelListConditionInput | null,
};

export type CreateListMutation = {
  createList?:  {
    __typename: "List",
    id: string,
    title: string,
    description?: string | null,
    imageKey?: string | null,
    ListItems?:  {
      __typename: "ModelListItemConnection",
      items?:  Array< {
        __typename: "ListItem",
        id: string,
        title: string,
        quantity?: number | null,
        done?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateListMutationVariables = {
  input?: UpdateListInput,
  condition?: ModelListConditionInput | null,
};

export type UpdateListMutation = {
  updateList?:  {
    __typename: "List",
    id: string,
    title: string,
    description?: string | null,
    imageKey?: string | null,
    ListItems?:  {
      __typename: "ModelListItemConnection",
      items?:  Array< {
        __typename: "ListItem",
        id: string,
        title: string,
        quantity?: number | null,
        done?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteListMutationVariables = {
  input?: DeleteListInput,
  condition?: ModelListConditionInput | null,
};

export type DeleteListMutation = {
  deleteList?:  {
    __typename: "List",
    id: string,
    title: string,
    description?: string | null,
    imageKey?: string | null,
    ListItems?:  {
      __typename: "ModelListItemConnection",
      items?:  Array< {
        __typename: "ListItem",
        id: string,
        title: string,
        quantity?: number | null,
        done?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateListItemMutationVariables = {
  input?: CreateListItemInput,
  condition?: ModelListItemConditionInput | null,
};

export type CreateListItemMutation = {
  createListItem?:  {
    __typename: "ListItem",
    id: string,
    title: string,
    quantity?: number | null,
    done?: boolean | null,
    list?:  {
      __typename: "List",
      id: string,
      title: string,
      description?: string | null,
      imageKey?: string | null,
      ListItems?:  {
        __typename: "ModelListItemConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    actions?:  {
      __typename: "ModelActionConnection",
      items?:  Array< {
        __typename: "Action",
        id: string,
        action?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateListItemMutationVariables = {
  input?: UpdateListItemInput,
  condition?: ModelListItemConditionInput | null,
};

export type UpdateListItemMutation = {
  updateListItem?:  {
    __typename: "ListItem",
    id: string,
    title: string,
    quantity?: number | null,
    done?: boolean | null,
    list?:  {
      __typename: "List",
      id: string,
      title: string,
      description?: string | null,
      imageKey?: string | null,
      ListItems?:  {
        __typename: "ModelListItemConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    actions?:  {
      __typename: "ModelActionConnection",
      items?:  Array< {
        __typename: "Action",
        id: string,
        action?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteListItemMutationVariables = {
  input?: DeleteListItemInput,
  condition?: ModelListItemConditionInput | null,
};

export type DeleteListItemMutation = {
  deleteListItem?:  {
    __typename: "ListItem",
    id: string,
    title: string,
    quantity?: number | null,
    done?: boolean | null,
    list?:  {
      __typename: "List",
      id: string,
      title: string,
      description?: string | null,
      imageKey?: string | null,
      ListItems?:  {
        __typename: "ModelListItemConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    actions?:  {
      __typename: "ModelActionConnection",
      items?:  Array< {
        __typename: "Action",
        id: string,
        action?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateActionMutationVariables = {
  input?: CreateActionInput,
  condition?: ModelActionConditionInput | null,
};

export type CreateActionMutation = {
  createAction?:  {
    __typename: "Action",
    id: string,
    action?: string | null,
    listItem?:  {
      __typename: "ListItem",
      id: string,
      title: string,
      quantity?: number | null,
      done?: boolean | null,
      list?:  {
        __typename: "List",
        id: string,
        title: string,
        description?: string | null,
        imageKey?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      actions?:  {
        __typename: "ModelActionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateActionMutationVariables = {
  input?: UpdateActionInput,
  condition?: ModelActionConditionInput | null,
};

export type UpdateActionMutation = {
  updateAction?:  {
    __typename: "Action",
    id: string,
    action?: string | null,
    listItem?:  {
      __typename: "ListItem",
      id: string,
      title: string,
      quantity?: number | null,
      done?: boolean | null,
      list?:  {
        __typename: "List",
        id: string,
        title: string,
        description?: string | null,
        imageKey?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      actions?:  {
        __typename: "ModelActionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteActionMutationVariables = {
  input?: DeleteActionInput,
  condition?: ModelActionConditionInput | null,
};

export type DeleteActionMutation = {
  deleteAction?:  {
    __typename: "Action",
    id: string,
    action?: string | null,
    listItem?:  {
      __typename: "ListItem",
      id: string,
      title: string,
      quantity?: number | null,
      done?: boolean | null,
      list?:  {
        __typename: "List",
        id: string,
        title: string,
        description?: string | null,
        imageKey?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      actions?:  {
        __typename: "ModelActionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetListQueryVariables = {
  id?: string,
};

export type GetListQuery = {
  getList?:  {
    __typename: "List",
    id: string,
    title: string,
    description?: string | null,
    imageKey?: string | null,
    ListItems?:  {
      __typename: "ModelListItemConnection",
      items?:  Array< {
        __typename: "ListItem",
        id: string,
        title: string,
        quantity?: number | null,
        done?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListListsQueryVariables = {
  filter?: ModelListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListListsQuery = {
  listLists?:  {
    __typename: "ModelListConnection",
    items?:  Array< {
      __typename: "List",
      id: string,
      title: string,
      description?: string | null,
      imageKey?: string | null,
      ListItems?:  {
        __typename: "ModelListItemConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetListItemQueryVariables = {
  id?: string,
};

export type GetListItemQuery = {
  getListItem?:  {
    __typename: "ListItem",
    id: string,
    title: string,
    quantity?: number | null,
    done?: boolean | null,
    list?:  {
      __typename: "List",
      id: string,
      title: string,
      description?: string | null,
      imageKey?: string | null,
      ListItems?:  {
        __typename: "ModelListItemConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    actions?:  {
      __typename: "ModelActionConnection",
      items?:  Array< {
        __typename: "Action",
        id: string,
        action?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListListItemsQueryVariables = {
  filter?: ModelListItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListListItemsQuery = {
  listListItems?:  {
    __typename: "ModelListItemConnection",
    items?:  Array< {
      __typename: "ListItem",
      id: string,
      title: string,
      quantity?: number | null,
      done?: boolean | null,
      list?:  {
        __typename: "List",
        id: string,
        title: string,
        description?: string | null,
        imageKey?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      actions?:  {
        __typename: "ModelActionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetActionQueryVariables = {
  id?: string,
};

export type GetActionQuery = {
  getAction?:  {
    __typename: "Action",
    id: string,
    action?: string | null,
    listItem?:  {
      __typename: "ListItem",
      id: string,
      title: string,
      quantity?: number | null,
      done?: boolean | null,
      list?:  {
        __typename: "List",
        id: string,
        title: string,
        description?: string | null,
        imageKey?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      actions?:  {
        __typename: "ModelActionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListActionsQueryVariables = {
  filter?: ModelActionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListActionsQuery = {
  listActions?:  {
    __typename: "ModelActionConnection",
    items?:  Array< {
      __typename: "Action",
      id: string,
      action?: string | null,
      listItem?:  {
        __typename: "ListItem",
        id: string,
        title: string,
        quantity?: number | null,
        done?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateListSubscription = {
  onCreateList?:  {
    __typename: "List",
    id: string,
    title: string,
    description?: string | null,
    imageKey?: string | null,
    ListItems?:  {
      __typename: "ModelListItemConnection",
      items?:  Array< {
        __typename: "ListItem",
        id: string,
        title: string,
        quantity?: number | null,
        done?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateListSubscription = {
  onUpdateList?:  {
    __typename: "List",
    id: string,
    title: string,
    description?: string | null,
    imageKey?: string | null,
    ListItems?:  {
      __typename: "ModelListItemConnection",
      items?:  Array< {
        __typename: "ListItem",
        id: string,
        title: string,
        quantity?: number | null,
        done?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteListSubscription = {
  onDeleteList?:  {
    __typename: "List",
    id: string,
    title: string,
    description?: string | null,
    imageKey?: string | null,
    ListItems?:  {
      __typename: "ModelListItemConnection",
      items?:  Array< {
        __typename: "ListItem",
        id: string,
        title: string,
        quantity?: number | null,
        done?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateListItemSubscription = {
  onCreateListItem?:  {
    __typename: "ListItem",
    id: string,
    title: string,
    quantity?: number | null,
    done?: boolean | null,
    list?:  {
      __typename: "List",
      id: string,
      title: string,
      description?: string | null,
      imageKey?: string | null,
      ListItems?:  {
        __typename: "ModelListItemConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    actions?:  {
      __typename: "ModelActionConnection",
      items?:  Array< {
        __typename: "Action",
        id: string,
        action?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateListItemSubscription = {
  onUpdateListItem?:  {
    __typename: "ListItem",
    id: string,
    title: string,
    quantity?: number | null,
    done?: boolean | null,
    list?:  {
      __typename: "List",
      id: string,
      title: string,
      description?: string | null,
      imageKey?: string | null,
      ListItems?:  {
        __typename: "ModelListItemConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    actions?:  {
      __typename: "ModelActionConnection",
      items?:  Array< {
        __typename: "Action",
        id: string,
        action?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteListItemSubscription = {
  onDeleteListItem?:  {
    __typename: "ListItem",
    id: string,
    title: string,
    quantity?: number | null,
    done?: boolean | null,
    list?:  {
      __typename: "List",
      id: string,
      title: string,
      description?: string | null,
      imageKey?: string | null,
      ListItems?:  {
        __typename: "ModelListItemConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    actions?:  {
      __typename: "ModelActionConnection",
      items?:  Array< {
        __typename: "Action",
        id: string,
        action?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateActionSubscription = {
  onCreateAction?:  {
    __typename: "Action",
    id: string,
    action?: string | null,
    listItem?:  {
      __typename: "ListItem",
      id: string,
      title: string,
      quantity?: number | null,
      done?: boolean | null,
      list?:  {
        __typename: "List",
        id: string,
        title: string,
        description?: string | null,
        imageKey?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      actions?:  {
        __typename: "ModelActionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateActionSubscription = {
  onUpdateAction?:  {
    __typename: "Action",
    id: string,
    action?: string | null,
    listItem?:  {
      __typename: "ListItem",
      id: string,
      title: string,
      quantity?: number | null,
      done?: boolean | null,
      list?:  {
        __typename: "List",
        id: string,
        title: string,
        description?: string | null,
        imageKey?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      actions?:  {
        __typename: "ModelActionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteActionSubscription = {
  onDeleteAction?:  {
    __typename: "Action",
    id: string,
    action?: string | null,
    listItem?:  {
      __typename: "ListItem",
      id: string,
      title: string,
      quantity?: number | null,
      done?: boolean | null,
      list?:  {
        __typename: "List",
        id: string,
        title: string,
        description?: string | null,
        imageKey?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      actions?:  {
        __typename: "ModelActionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
