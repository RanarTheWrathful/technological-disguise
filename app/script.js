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
