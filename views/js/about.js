console.log('oker')

const repos = [
    'repo1',
    'repo2',
    'repo3'
]

// create a map function to return a list of repos with a link to the repo as list items
const repoList = repos.map(repo => {
    return `<li><a href="${repo}">${repo}</a></li>`
})
console.log(repoList)
