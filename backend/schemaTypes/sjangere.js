export const sjangere = {
    title: "sjangere",
    name: "genres",
    type: "document",
    fields: [
        {
            title: "sjangertittel",
            name: "genretitle",
            type: "string"
        },
        {
            title: "imdbid",
            name: "imdbid",
            type: "string"
        },
        {
            title: "sjangerlink",
            name: "genreurl",
            type: "slug",
            options: {
                source: "genretitle",
                //kode for slugifisering hentet fra forelesning
                slugify: input => input.toLowerCase().replace(/\s+/g, '-')
            }
        }
    ]
}