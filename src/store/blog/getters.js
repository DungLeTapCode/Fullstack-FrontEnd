export default {
    allBlogs: (state) => {  return state.blogs ;},
    latestBlogs: (state) => {
        return [...state.blogs].sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
      },
}