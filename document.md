\*\* Ostad join to group

````type ProductSearchParams = {
_sort?: "price" | "-price";
category?: string | string[];
};
export async function getProducts(params: ProductSearchParams) {
const response = await api.get<Course>(`/products`, { params });
return response.data;
}

export const useGetProduct = (params: ProductSearchParams) => {
return useQuery({
queryKeys: ["products", "list", params],
queryfn: () => getProducts(params),
});
};

export const ProductList = () => {
const [params, setParams] = useState<ProductSearchParams>();
const { data, isLoading } = useGetProduct(params);
};```
````
