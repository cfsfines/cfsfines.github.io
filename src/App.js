import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Spotify from './components/Spotify';
import SearchPlaylist from './components/SearchPlaylist';
import PlaySongs from './components/PlaySongs';
import withLocalStorageCheck from './components/withLocalStorageCheck';

const SearchPlaylistWithLocalStorageCheck = withLocalStorageCheck(SearchPlaylist);

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/spotify" element={<Spotify />}>
        <Route path='playlist' element={<SearchPlaylistWithLocalStorageCheck />} />
        <Route path='play' element={<PlaySongs />} />
      </ Route>
    </Routes>
  );
}

export default App;
