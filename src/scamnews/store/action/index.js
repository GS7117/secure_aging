import { endpointPath } from "../../config/api";
import axios from "axios";
import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from "./actionTypes";

const fetchDataRequest = () => ({
  type: SEARCH_REQUEST,
});

const fetchDataSuccess = (result, query) => ({
  type: SEARCH_SUCCESS,
  payload: {
    articles: result,
    query: query,
  },
});

const fetchDataFailure = (error) => ({
  type: SEARCH_FAILURE,
  payload: error,
});

// searchArticle 函数会使用 endpointPath 来生成 API 请求
export const searchArticle = (query, country = "au") => async (dispatch) => {
  try {
    dispatch(fetchDataRequest());
    
    // 调用 endpointPath，并传递用户输入的关键词和国家
    const apiUrl = endpointPath(country, query);
    console.log("API URL:", apiUrl); // 调试用
    
    const response = await axios.get(apiUrl);
    const result = response.data;
    
    dispatch(fetchDataSuccess(result, query));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};