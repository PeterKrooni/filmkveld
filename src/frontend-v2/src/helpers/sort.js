// sort suggestions
// first entry of each suggestions array left to right
// TODO
export default {
    sort_suggestions(allSuggestions, compareFn=function(a, b){ a.created < b.created }, isSingleRow=false){
        allSuggestions.sort(compareFn)

        let sl, sm, sr
        allSuggestions.forEach((s, i) => {
            if (i%2==0) { sm.push(s) } else
            if (i%3==0) { sr.push(s) } else
                        { sl.push(s) }
        })  
        return sl, sm, sr
    },
}