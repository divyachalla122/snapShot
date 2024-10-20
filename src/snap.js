import React, { useState } from 'react';
const apikey = "636e1481b4f3c446d26b8eb6ebfe7127";
    const Snap = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
 const [noImages, setNoImages] = useState(false);
        const changeHandler = e =>{
        setSearch(e.target.value);
    };

    const handleSubmit = e =>{
        e.preventDefault();
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&tags=${search}&per_page=24&format=json&nojsoncallback=1`;
  fetch(url)
 .then(response => response.json())
.then(data => {
    if (data.photos.photo.length > 0) {
        setResults(data.photos.photo);
        setNoImages(false);
    } else {
        setResults([]);
        setNoImages(true);
    }
})
.catch(error => {
    console.error("Error fetching data:", error);
});
        console.log(search);
    }
const images = results.map(image => {
    const farm = image.farm;
    const server = image.server;
    const id = image.id;
    const secret = image.secret;
    const title = image.title;
    const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
return (
    <li key={id}>
        <img src={url} alt={title} />
        <p>{title}</p>
    </li>
);
});
    return(
        <div>
            <center>
            <h1>SnapShot</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={search} onChange={changeHandler }></input>
                <input type="submit" name='search'/>
            </form>
        
            <br/>
            <button onClick={() => setSearch('Mountain')}>Mountain</button>
            <button onClick={() => setSearch('Beaches')}>Beaches</button>
            <button onClick={() => setSearch('Brid')}>Birds</button>
            <button onClick={() => setSearch('food')}>food</button>
            <br/>
            
    
            <h2>{search ? `${search} Pictures` : "Pictures"}</h2>
            <ul>{images}</ul>
            {noImages && <p>No images found.</p>}
            <h2>Mountain Pictures</h2>
            </center>
        </div>
    )
}
export default Snap;






