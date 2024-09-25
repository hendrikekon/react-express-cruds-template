import Axios from "axios";


const fetchProduct =  async () =>{
    try{
        const result = await Axios.get('http://localhost:3000/api/v2/product')
        // console.log('Full API response:', result);
        const responseApi = result.data;
        if (Array.isArray(responseApi)) {
            return responseApi;
            // console.log('Data set:', responseApi);
            } else {
                console.error('Data is not an array or is undefined');
                return[];
            }
    }catch (err) {
        console.error(err);
        return[];
    }
}

export default fetchProduct;