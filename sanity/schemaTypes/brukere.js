export const brukere = {
    title: "brukere",
    name: "users",
    type: "document",
    fields: [
        {
            title: "brukernavn",
            name: "username",
            type: "string"
        },
        {
            title: "Ønskeliste",
            name: "wishlist",
            type: "array",
            of: [
            {
                type: 'reference',
                to: [{type: "movies"}]
            }
                ]
        },
 
    ]
}