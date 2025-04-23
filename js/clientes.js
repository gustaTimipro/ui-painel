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

// Checkbox no cliente da lista
function setupToggleVisibility(listCardSelector, btnOrderSelector, btnImvSelector) {
    const listClientes = document.querySelector(listCardSelector);
    const btnOrder = document.querySelector(btnOrderSelector);
    const btnImv = document.querySelectorAll(btnImvSelector);

    const updateVisibility = () => {
        const checkboxes = listClientes.querySelectorAll('.client-item input[type="checkbox"]:checked');
        const hasChecked = checkboxes.length > 0;

        if (hasChecked) {
            btnOrder.classList.add('hidden');
            btnOrder.classList.remove('visible');
            btnImv.forEach(btn => {
                btn.classList.add('visible');
                btn.classList.remove('hidden');
            });
        } else {
            btnOrder.classList.add('visible');
            btnOrder.classList.remove('hidden');
            btnImv.forEach(btn => {
                btn.classList.add('hidden');
                btn.classList.remove('visible');
            });
        }
    };

    listClientes.addEventListener('change', (event) => {
        if (event.target.type === 'checkbox') {
            updateVisibility();
        }
    });

    updateVisibility();
}
setupToggleVisibility('.list-clientes', '.btn-order', '.btn-imv');

// Checkbox que seleciona todos os clientes
function handleClientesTodosCheckbox() {
    const ClientesTodos = document.querySelector('#clientesTodos');
    const checkboxes = document.querySelectorAll('.client-item input[type="checkbox"]');
    const btnOrder = document.querySelector('.btn-order');
    const btnImv = document.querySelectorAll('.btn-imv');

    const isChecked = ClientesTodos.checked;

    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });

    if (isChecked) {
        btnOrder.classList.add('hidden');
        btnOrder.classList.remove('visible');
        btnImv.forEach(btn => {
            btn.classList.add('visible');
            btn.classList.remove('hidden');
        });
    } else {
        btnOrder.classList.add('visible');
        btnOrder.classList.remove('hidden');
        btnImv.forEach(btn => {
            btn.classList.add('hidden');
            btn.classList.remove('visible');
        });
    }
}
document.querySelector('#clientesTodos').addEventListener('change', handleClientesTodosCheckbox)

// Modal - Função inicial
function initModal(triggerSelector, modalSelector, closeSelector, activeClass = 'active', confirmClose = false, confirmModalSelector = null) {
    const triggers = document.querySelectorAll(triggerSelector);
    const modalContainer = document.querySelector(modalSelector);
    const closeButton = modalContainer?.querySelector(closeSelector);

    let confirmModalContainer = null;
    let confirmCloseButtons = null;

    if (confirmClose && confirmModalSelector) {
        confirmModalContainer = document.querySelector(confirmModalSelector);
        confirmCloseButtons = confirmModalContainer?.querySelectorAll('button');
    }

    if (!modalContainer) {
        return;
    }

    // Abrir
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            if (event.target.closest('input[type="checkbox"]')) {
                event.stopPropagation();
                return;
            }

            modalContainer.classList.add(activeClass);
        });
    });

    // Fechar
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            if (confirmClose && confirmModalContainer) {
                confirmModalContainer.classList.add(activeClass);
            } else {
                modalContainer.classList.remove(activeClass);
            }
        });
    }

    // Confirmar/Fechar
    if (confirmModalContainer && confirmCloseButtons) {
        confirmCloseButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                if (button.classList.contains('btn-destructive')) {
                    modalContainer.classList.remove(activeClass);
                }
                confirmModalContainer.classList.remove(activeClass);
            });
        });
    }
}

initModal(
    '[data-new-cliente="open"]',
    '[data-new-cliente="container"]',
    '[data-new-cliente="close"]',
    'active',
    false,
    '[data-cancel="container"]'
);
initModal(
    '[data-cliente="open"]',
    '[data-cliente="container"]',
    '[data-cliente="close"]',
    'active',
    false,
    '[data-cancel="container"]'
);
initModal(
    '[data-edit-imovel="open"]',
    '[data-edit-imovel="container"]',
    '[data-edit-imovel="close"]',
    'active',
    false,
    '[data-cancel="container"]'
);

// Modal - Alternar checkbox Padrao e Empreendimento (Adicionar)
function initializeToggleDisable(options) {
    const { checkboxSelector, contentSelector, disabledClass = "disabled", allowSingleSelection = false } = options;

    const checkboxes = document.querySelectorAll(checkboxSelector);
    const contentElements = document.querySelectorAll(contentSelector);

    // seleciona UMA checkbox
    const enforceSingleSelection = (currentCheckbox) => {
        if (allowSingleSelection) {
            checkboxes.forEach(checkbox => {
                if (checkbox !== currentCheckbox) {
                    checkbox.checked = false;
                }
            });
        }
    };

    // Atualiza a classe 'disabled' nos elementos de conteúdo
    const updateDisabledState = () => {
        const isAnyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
        contentElements.forEach(content => {
            content.classList.toggle(disabledClass, !isAnyChecked);
        });
    };

    // Adiciona eventos de alteração nas checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            enforceSingleSelection(checkbox);
            updateDisabledState();
        });
    });

    // Atualiza o estado inicial
    updateDisabledState();
}
document.addEventListener("DOMContentLoaded", () => {
    initializeToggleDisable({
        checkboxSelector: ".new-options .imovel-checkbox",
        contentSelector: ".new-imovel-modal .info-content:not(:first-child)",
        disabledClass: "disabled",
        allowSingleSelection: true, // Apenas uma checkbox pode ser selecionada
    });
    initializeToggleDisable({
        checkboxSelector: ".edit-options .imovel-checkbox",
        contentSelector: ".edit-imovel-modal .info-content:not(:first-child)",
        disabledClass: "disabled",
        allowSingleSelection: true, // Apenas uma checkbox pode ser selecionada
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Para cada bloco de indicador
    const indicators = document.querySelectorAll(".client-analisis");

    indicators.forEach(indicator => {
        const progElements = indicator.querySelectorAll(".graph-bar .prog");
        const textElement = indicator.querySelector(".indic-text .headline-medium");

        // Define os textos para cada tipo
        let labels = [];

        const title = indicator.querySelector(".indic-top").textContent.trim();

        if (title.includes("Tipo de Negócio")) {
            labels = ["Venda", "Aluguel", "Lançamento"];
        } else if (title.includes("Quantidade de Quartos")) {
            labels = ["1 quarto", "2 quartos", "3+ quartos"];
        } else if (title.includes("Tipo de Imóvel")) {
            labels = ["Apartamento", "Condomínio", "Casa"];
        } else if (title.includes("Bairro")) {
            labels = ["Asa Norte", "Asa Sul", "Jardim Botânico"];
        } else {
            labels = ["Início", "Meio", "Fim"];
        }

        // Marca o primeiro como active ao iniciar
        let currentIndex = 0;
        progElements[0].classList.add("active");
        textElement.textContent = labels[0];

        progElements.forEach((prog, index) => {
            prog.addEventListener("mouseover", () => {
                // Remove todas as classes active
                progElements.forEach(p => p.classList.remove("active"));

                // Ativa a atual
                prog.classList.add("active");

                // Atualiza o texto
                textElement.textContent = labels[index];
            });

            prog.addEventListener("mouseout", () => {
                // Atualiza o índice do último hovered
                currentIndex = index;

                // Remove todas as active
                progElements.forEach(p => p.classList.remove("active"));

                // Mantém o último hovered como ativo
                progElements[currentIndex].classList.add("active");
                textElement.textContent = labels[currentIndex];
            });
        });
    });
});


// Modal - Abrir e fechar seções
document.addEventListener("DOMContentLoaded", () => {
    const infoContents = document.querySelectorAll(".cliente-modal .toggle-content");

    infoContents.forEach((content) => {
        // Garante que começa fechado
        const elements = content.querySelectorAll(".info-toggle");
        elements.forEach((el) => {
            el.classList.remove("visible");
            el.classList.add("hidden");
            el.style.display = 'none';
        });

        // Delay para registrar os eventos
        setTimeout(() => {
            const header = content.querySelector(".info-header");

            header.addEventListener("click", (event) => {
                if (content.classList.contains("disabled")) {
                    return;
                }

                const columnsAndRows = content.querySelectorAll(".info-toggle");

                columnsAndRows.forEach((element) => {
                    if (element.classList.contains("hidden")) {
                        element.style.display = 'flex';
                        setTimeout(() => {
                            element.classList.remove('hidden');
                            element.classList.add('visible');
                        }, 10);
                    } else {
                        element.classList.remove("visible");
                        element.classList.add("hidden");
                        setTimeout(() => {
                            element.style.display = 'none';
                        }, 300);
                    }
                });

                const icon = header.querySelector("i:last-child");
                if (icon) {
                    icon.classList.toggle("uil-angle-up");
                    icon.classList.toggle("uil-angle-down");
                }
            });
        }, 1000);
    });
});


// Tabs para Clientes
function configurarBotoesDeGrupoComTabs(groupSelector, btnClass, contentSelector, activeClass) {
    const groupContainers = document.querySelectorAll(groupSelector);
    const tabContents = document.querySelectorAll(contentSelector);

    groupContainers.forEach((group) => {
        const buttons = group.querySelectorAll('button');

        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                buttons.forEach((btn) => btn.classList.add(btnClass));

                button.classList.remove(btnClass);

                tabContents.forEach((content, contentIndex) => {
                    if (contentIndex === index) {
                        content.classList.add(activeClass);
                    } else {
                        content.classList.remove(activeClass);
                    }
                });
            });
        });
    });
}
configurarBotoesDeGrupoComTabs('.action-clientes', 'btn-standart', '.tabs-container > .table', 'active');