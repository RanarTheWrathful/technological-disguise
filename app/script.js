// JavaScript to handle tab switching
document.addEventListener('DOMContentLoaded', function () {
    const tabLinks = document.querySelectorAll('.tab-link');
    const subTabLinks = document.querySelectorAll('.sub-tab-link');
    
    // Set default tab to About Me
    showTab('about-me');
    setActiveTab(tabLinks, 'about-me');

    // Function to show the selected tab
    function showTab(tabId) {
        // Hide all tabs
        const allTabs = document.querySelectorAll('.tab-content');
        allTabs.forEach(tab => tab.style.display = 'none');
        
        // Show the selected tab
        const activeTab = document.getElementById(tabId);
        if (activeTab) activeTab.style.display = 'block';
        
        // Hide all sub-tabs
        const allSubTabs = document.querySelectorAll('.sub-tab-content');
        allSubTabs.forEach(subTab => subTab.style.display = 'none');
    }

    // Function to highlight the selected tab
    function setActiveTab(links, selectedTabId) {
        links.forEach(link => {
            if (link.dataset.tab === selectedTabId) {
                link.classList.add('selected');
            } else {
                link.classList.remove('selected');
            }
        });
    }

    // Handle tab link clicks
    tabLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            const tabId = event.target.dataset.tab;
            showTab(tabId);
            setActiveTab(tabLinks, tabId);
        });
    });

    // Handle sub-tab link clicks
    subTabLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            const subTabId = event.target.dataset.subtab;
            const allSubTabs = document.querySelectorAll('.sub-tab-content');
            allSubTabs.forEach(subTab => subTab.style.display = 'none');
            const activeSubTab = document.getElementById(subTabId);
            if (activeSubTab) activeSubTab.style.display = 'block';
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    // Handle main tabs
    document.querySelectorAll(".tab-link").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const tab = e.target.dataset.tab;

            document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");
            document.getElementById(tab).style.display = "block";
        });
    });

    // Handle music sub-tabs
    document.querySelectorAll(".sub-tab-link").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const sub = e.target.dataset.subtab;

            document.querySelectorAll(".sub-tab-content").forEach(t => t.style.display = "none");
            const target = document.getElementById(sub);
            target.style.display = "block";

            loadMusic(sub, target);
        });
    });
});

async function loadMusic(projectName, container) {
    try {
        const res = await fetch("music.json");
        const data = await res.json();

        const projectKey = Object.keys(data).find(k =>
            k.toLowerCase().replace(/ /g, "-") === projectName
        );

        if (!projectKey) {
            container.innerHTML = "<p>No data found.</p>";
            return;
        }

        const albums = data[projectKey];

        // Clear container
        container.innerHTML = "";
        const albumList = document.createElement("div");
        albumList.className = "album-list";

        for (const album in albums) {
            const files = albums[album];

            const albumDiv = document.createElement("div");
            albumDiv.className = "album";

            const albumTitle = document.createElement("h4");
            albumTitle.textContent = album;
            albumDiv.appendChild(albumTitle);

            const ul = document.createElement("ul");
            ul.style.listStyle = "none";
            ul.style.paddingLeft = "0";

            files.forEach(file => {
                const ext = file.split(".").pop().toLowerCase();
                const url = `./${projectKey}/${album}/${file}`;

                const li = document.createElement("li");
                li.className = "song-item";
                li.style.display = "flex";
                li.style.flexDirection = "column";
                li.style.alignItems = "flex-start";
                li.style.marginBottom = "1em";

                const name = document.createElement("span");
                name.className = "file-name";
                name.style.fontWeight = "bold";
                name.style.marginBottom = "0.25em";
                name.textContent = file;

                li.appendChild(name);

                if (["mp3","wav","ogg"].includes(ext)) {
                    const audio = document.createElement("audio");
                    audio.controls = true;
                    audio.src = url;
                    li.appendChild(audio);
                } else if (["png","jpg","jpeg","webp"].includes(ext)) {
                    const img = document.createElement("img");
                    img.src = url;
                    img.alt = file;
                    img.className = "song-image";
                    li.appendChild(img);
                } else {
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = true;
                    link.textContent = "Download";
                    li.appendChild(link);
                }

                ul.appendChild(li);
            });

            albumDiv.appendChild(ul);
            albumList.appendChild(albumDiv);
        }

        container.appendChild(albumList);
    } catch (err) {
        console.error("Failed to load music:", err);
        container.innerHTML = "<p>Error loading music data.</p>";
    }
}
