/*
    TODO: handle parsing errors
        - put in try catch block
        - inside try block
            - if the parsedData exists at all, as well as all of its expected properties (if it has the expected structure)
            (this can partially handled when i eventually create an interface for every returned type)
*/
const loadSavedPlaylistData = (setPlaylistData, name = "playlistData") => {
    const savedPlaylistData = localStorage.getItem(name);
    if (savedPlaylistData) {
        console.log('playlist found in local storage')
        const parsedData = JSON.parse(savedPlaylistData);
        setPlaylistData(parsedData);
        return true;
    }
    return false
};

export default loadSavedPlaylistData