// Dropdowns
document.addEventListener('click', function (event) {
    const clickedDropdownButton = event.target.closest('.btn-dropdown');
    const allDropdownGroups = document.querySelectorAll('.dropdown-group');

    if (clickedDropdownButton) {
        const dropdownGroup = clickedDropdownButton.nextElementSibling;

        allDropdownGroups.forEach(group => {
            group.style.display = group === dropdownGroup && group.style.display !== 'flex' ? 'flex' : 'none';
        });
    } else {
        const clickedItem = event.target.closest('.dropdown-group .item');
        const clickedInsideDropdownGroup = event.target.closest('.dropdown-group');
        const clickedLabel = event.target.closest('.dropdown-group label');

        if (clickedItem) {
        } else if (!clickedInsideDropdownGroup || clickedLabel) {
            allDropdownGroups.forEach(group => (group.style.display = 'none'));
        }
    }
});
