import { categoryConstants } from '../_constants';

export function category(state = [], action) {
    switch (action.type) {
        case categoryConstants.LOAD_REQUEST_CATEGORY: {
            return action.category;
        }
        case categoryConstants.EDIT_CATEGORY: {
            return findAndChange(action.category.id, action.category.newValue, state);
        }

        case categoryConstants.ADD_CATEGORY: {
            return findAndAdd(action.category, state);
        }

        case categoryConstants.REMOVE_CATEGORY: {
            return findAndRemove(action.category.id, state);
        }

        default:
            return state
    }
}

  /// ищем и меняем значение категории
  const findAndChange = (search, newValue, treeItems) => { 
    return treeItems.map(treeItemData => {
      let children = undefined;
      if (treeItemData.children && treeItemData.children.length > 0) {
        children = findAndChange(search, newValue,treeItemData.children);
      }
      if (treeItemData.id === search) treeItemData.name = newValue;
      return treeItemData;
    });
  }

  /// ищем и добавляем значение категории
  const findAndAdd = (treeSearch, treeItems) => { 

    if (treeSearch.iParent === "0")  {
      return [
        ...treeItems,
        {
          id: treeSearch.id,
          name: treeSearch.chName,
          children: []
        }
      ]
    }

    return treeItems.map(treeItemData => {
      let children = undefined;
      if (treeItemData.children && treeItemData.children.length > 0) {
        children = findAndAdd(treeSearch, treeItemData.children);
      }
      if (treeItemData.id === treeSearch.iParent) {
            treeItemData.children = [
                ...treeItemData.children,
                {
                    id: treeSearch.id,
                    name: treeSearch.chName,
                    children: [],
                }
            ]
      }
      return treeItemData;
    });
  }

  // ищем и удаляем
  const findAndRemove = (id, data) => {
    if(!Array.isArray(data))
      return data
      
    return data.filter(item => {
      if('children' in item)
          item.children = findAndRemove(id, item.children)
      return (item.id === undefined || item.id !== id)
    })
  }

  