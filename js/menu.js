const menu = document.querySelector('.menu');
const menuBrandImage = document.querySelector('.menu-brand img');
const collapseButton = document.querySelector('.menu-header .btn-icon-md');
const menuItems = document.querySelectorAll('.menu-item.simple');
const menuItemGroups = document.querySelectorAll('.menu-item-group');

menuItems.forEach(simpleItem => {
    simpleItem.addEventListener('click', () => {
        menuItems.forEach(item => item.classList.remove('active'));
        simpleItem.classList.add('active');

        menuItemGroups.forEach(group => {
            const primaryItem = group.querySelector('.menu-item.primary');
            const menuGroup = group.querySelector('.menu-group');
            const secondaryItems = group.querySelectorAll('.menu-item.secondary');

            primaryItem.classList.remove('active');
            menuGroup.classList.remove('active');
            secondaryItems.forEach(item => item.classList.remove('active'));
        });
    });
});

menuItemGroups.forEach(group => {
    const primaryItem = group.querySelector('.menu-item.primary');
    const menuGroup = group.querySelector('.menu-group');
    const secondaryItems = menuGroup.querySelectorAll('.menu-item.secondary');

    primaryItem.addEventListener('click', () => {
        menuItemGroups.forEach(otherGroup => {
            const otherPrimary = otherGroup.querySelector('.menu-item.primary');
            const otherMenuGroup = otherGroup.querySelector('.menu-group');
            const otherSecondaryItems = otherGroup.querySelectorAll('.menu-item.secondary');

            if (otherPrimary !== primaryItem) {
                otherPrimary.classList.remove('active');
                otherMenuGroup.classList.remove('active');
                otherSecondaryItems.forEach(item => item.classList.remove('active'));
            }
        });

        primaryItem.classList.toggle('active');
        menuGroup.classList.toggle('active');
    });

    secondaryItems.forEach(secondaryItem => {
        secondaryItem.addEventListener('click', e => {
            e.stopPropagation();
            secondaryItems.forEach(item => item.classList.remove('active'));
            secondaryItem.classList.add('active');
            menuItems.forEach(item => item.classList.remove('active'));
        });
    });
});

let isManuallyCollapsed = false;

// Botão de colapso
collapseButton.addEventListener('click', () => {
    menu.classList.toggle('collapse');
    isManuallyCollapsed = menu.classList.contains('collapse');

    if (isManuallyCollapsed) {
        collapseButton.style.display = 'none';
        menuBrandImage.src = '../assets/brand-collapse.svg';
    } else {
        collapseButton.style.display = 'block';
        menuBrandImage.src = '../assets/brand-logo.svg';
    }
});

// Eventos de mouse no menu
menu.addEventListener('mouseenter', () => {
    if (isManuallyCollapsed) {
        menu.classList.remove('collapse'); // Mostra o menu expandido ao passar o mouse
        collapseButton.style.display = 'block';
        menuBrandImage.src = '../assets/brand-logo.svg';
    }
});

// Removido o comportamento de colapso automático ao sair do menu
