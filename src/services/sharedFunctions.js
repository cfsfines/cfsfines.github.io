/*
    TODO: handle parsing errors
        - put in try catch block
        - inside try block
            - if the parsedData exists at all, as well as all of its expected properties (if it has the expected structure)
            (this can partially handled when i eventually create an interface for every returned type)
*/
const loadSavedPlaylistData = (setPlaylistData) => {
    console.log("attemping to load playlist data");
    const savedPlaylistData = localStorage.getItem("playlistData");
    if (savedPlaylistData) {
        const parsedData = JSON.parse(savedPlaylistData);
        setPlaylistData(parsedData);
        console.log("loading success");
        return true;
    }
    console.log("no playlist data saved in local storage");
    return false
};

export default loadSavedPlaylistData