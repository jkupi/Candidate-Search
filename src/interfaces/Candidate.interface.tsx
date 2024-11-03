// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    id: number,
    login: string,
    avatar_url: string,
    email?: string,
    location?: string,
    html_url?: string,
    company?: string,
    bio?: string,
}