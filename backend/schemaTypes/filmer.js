export const filmer = {
    title: "filmer",
    name: "movies",
    type: "document",
    fields: [
        {
            title: "filmtittel",
            name: "movietitle",
            type: "string"
        },
        {
            title: "imdbid",
            name: "imdbid",
            type: "string"
        },
        {
            title: "sjanger",
            name: "genre",
            type: "reference",
            to: [{type: "genres"}]
        }
    ]
}