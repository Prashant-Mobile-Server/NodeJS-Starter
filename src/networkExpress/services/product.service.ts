import { getProductDetailData, getProductListData } from '../dataMongo/product.data';

export async function getProductListService() {
    const responseData = await getProductListData();
    const response = {
        data: {
            responseData
        },
        error: null
    }
    return response;
};


export async function getProductDetailService(productId: string) {
    const productDetail = await getProductDetailData(productId);
    const response = {
        data: {
            productDetail
        },
        error: null
    }
    return response;
};

