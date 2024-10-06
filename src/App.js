import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from "./components/Home";
import Spotify from './components/Spotify';
import SearchPlaylist from './components/SearchPlaylist';
import PlaySongs from './components/PlaySongs';
import withLocalStorageCheck from './components/withLocalStorageCheck';
import { BackgroundColor } from './components/SharedStyles';

const SearchPlaylistWithLocalStorageCheck = withLocalStorageCheck(SearchPlaylist);

function App() {
  return (
    <Router>
      <ConditionalBackground>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spotify" element={<Spotify />}>
            <Route path="playlist" element={<SearchPlaylistWithLocalStorageCheck />} />
            <Route path="play" element={<PlaySongs />} />
          </Route>
        </Routes>
      </ConditionalBackground>
    </Router>
  );
}

function ConditionalBackground({ children }) {
  const location = useLocation();
  return (
    <>
      {location.pathname.startsWith('/spotify') && <BackgroundColor />}
      {children}
    </>
  );
}

export default App;
