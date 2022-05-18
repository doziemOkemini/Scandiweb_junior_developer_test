import { useQuery, gql} from '@apollo/client';

//Higher Order Function using useQuery to fetch the graphQl data
const WithCategoryNameQuery = WrappedComponent => {
    const WithCategoryNameQuery = () => {
        const {data: categoryName, error: categoryNameError, loading: categoryNameLoading} = useQuery(
            gql`
                query categoryList {
                        categories{
                            name
                        }
                }
                         
            `
        );

        const { data:currencyData, error: currencyError, loading: currencyLoading} = useQuery(
            gql`
                query currencyList{
                    currencies{
                        label
                        symbol
                    }
                }
            `
        );
        
        return <WrappedComponent query={categoryName} categoryIsLoading={categoryNameLoading} categoryError={categoryNameError}
                                 currencyQuery={currencyData} currencyDataLoading = {currencyLoading} currencyDataError={currencyError} />
    }

    return WithCategoryNameQuery;
}

export default WithCategoryNameQuery;