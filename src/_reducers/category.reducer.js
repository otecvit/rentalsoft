import { categoryConstants } from '../_constants';

const data = [
    {
      id: "1",
      name: "Медтехника",
      children: [
        {
          id: "3",
          name: "Костыли",
          children: []
        },
        {
          id: "15",
          name: "Ходунки",
          children: []
        },
        {
          id: "5",
          name: "Коляски",
          children: []
        }
  
  
  
      ]
    },
    {
      id: "2",
      name: "Italian",
      children: [
        {
          id: "4",
          name: "Level A",
          children: []
        }
      ]
    }
  ];

export function category(state = data, action) {
    switch (action.type) {
        case categoryConstants.LOAD_REQUEST_CATEGORY: {
            return {
                ...state,
                ...action.category
            };
        }
        case categoryConstants.EDIT_CATEGORY: {
            return findAndChange(action.category.id, action.category.newValue, state);
        }

        case categoryConstants.ADD_CATEGORY: {
            return findAndAdd(action.category.id, action.category.value, state);
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
  const findAndAdd = (search, value, treeItems) => { 
    return treeItems.map(treeItemData => {
      let children = undefined;
      if (treeItemData.children && treeItemData.children.length > 0) {
        children = findAndAdd(search, value,treeItemData.children);
      }
      if (treeItemData.id === search) {
            treeItemData.children = [
                ...treeItemData.children,
                {
                    id: "132",
                    name: value,
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

  