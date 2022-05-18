import { useQuery, gql} from '@apollo/client';

//Higher Order Function using useQuery to fetch the graphQl data
const WithQuery = WrappedComponent => {
    const WithQuery = () => {
        const {data, error, loading} = useQuery(
            gql`
                query categoryAll {
                            categories{
                                name
                                products {
                                id
                                name
                                description
                                gallery
                                brand 
                                inStock
                                    prices{
                                        currency{
                                            label
                                            symbol
                                        }
                                        amount
                                    }
                                }
                            }
                         }
            `
        );
        return <WrappedComponent query={data} error={error} isLoading={loading}/>
    }

    return WithQuery;
}

export default WithQuery;