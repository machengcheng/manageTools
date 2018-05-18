/**
 * 添加tab
 */
export const addTab = ({commit, state}, tab) => {
    commit('ADD_TAB', tab);
};

/**
 * 删除tab
 * @param commit
 * @param state
 * @param tab
 */
export const delTab = ({commit, state}, tabName) => {
    commit('DEL_TAB', tabName);
};

export const setMyCenterTab = ({commit, state}, tabName) => {
    commit('SET_MY_CENTER_TAB', tabName);
};


export const addIllegalDataSearch = ({commit, state}, data) => {
	commit('ILLEGAL_DATA_SEARCH', data);
};


//资产授权，设置当前选中节点
export const setAuthCurrentNode = ({commit, state}, data) => {
    commit('Set_Auth_Current_Node', data);
};
