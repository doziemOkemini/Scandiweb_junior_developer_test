import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql} from '@apollo/client';

export const WithParams = (Component) => { //Higher Order Function using useQuery to fetch the graphQl data to use with product Params
    const WithParams = () => {
        const {id} = useParams();
        const {data, error} = useQuery(
            gql`
                query categoryAll {
                            category{
                                products {
                                id
                                name
                                description
                                gallery
                                brand 
                                inStock
                                attributes{
                                id
                                name
                                type
                                items{
                                displayValue
                                value
                                id
                                }
                            }
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

        return <Component id={id} data={data} error={error}/>;
    }

    return WithParams;
}