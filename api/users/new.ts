import config from "@/.env/config";
import { request, gql } from "graphql-request";

interface ITerms {
    agelimit: boolean;
    usepolicy: boolean;
    privacy: boolean;
    promotion: boolean;
}

interface IParams {
    email: string;
    username: string;
    password: string;
    terms: ITerms
}

const req = async (params: IParams) => {
    const query = gql`
        mutation newUser($user: NewUser!) {
            newUser(user: $user) {
                id
                email
                username
            }
        }
    `;
    return await request(config.endpoint, query, { user: params });
}

export default req;