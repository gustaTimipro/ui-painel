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
        const clickedLabel = event.target.closest('.dropdown-group label'); // Verifica se clicou em um <label>

        if (clickedItem) {
            const dropdown = clickedItem.closest('.dropdown');
            const btnLabel = dropdown.querySelector('.btn-label');
            const newValue = clickedItem.getAttribute('data-value');
            const newText = clickedItem.textContent;

            btnLabel.textContent = newText;
            btnLabel.classList.add('bold');

            const dropdownGroup = dropdown.querySelector('.dropdown-group');
            dropdownGroup.style.display = 'none';
        } else if (!clickedInsideDropdownGroup || clickedLabel) {
            // Fecha apenas se o clique for fora do dropdown-group e não for em um label
            allDropdownGroups.forEach(group => (group.style.display = 'none'));
        }
    }
});


// Completo/Simplificado - Ações no Imóvel
function configureVisibilityActions(btnVisibleId, btnHiddenId, targetClass) {
    const btnVisible = document.querySelector(`.${btnVisibleId}`);
    const btnHidden = document.querySelector(`.${btnHiddenId}`);

    // mostrar elementos
    function showElements() {
        const elements = document.querySelectorAll(`.${targetClass}`);
        elements.forEach((element) => {
            element.style.display = 'flex';
            setTimeout(() => {
                element.classList.remove('hidden');
                element.classList.add('visible');
            }, 10);
        });

        btnVisible.classList.remove('btn-standart');
        btnHidden.classList.add('btn-standart');
    }

    // esconder elementos
    function hideElements() {
        const elements = document.querySelectorAll(`.${targetClass}`);
        elements.forEach((element) => {
            element.classList.remove('visible');
            element.classList.add('hidden');
            setTimeout(() => {
                element.style.display = 'none';
            }, 300);
        });

        btnHidden.classList.remove('btn-standart');
        btnVisible.classList.add('btn-standart');
    }

    btnVisible.addEventListener('click', showElements);
    btnHidden.addEventListener('click', hideElements);
}
configureVisibilityActions('btn-visible', 'btn-hidden', 'item-visible');

// Tabs para Imoveis
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
configurarBotoesDeGrupoComTabs('.action-imovel', 'btn-standart', '.tabs-container > .table', 'active');

// Selecionar imovel pelo checkbox altera buttons na table action
function setupToggleVisibility(listCardSelector, btnOrderSelector, btnImvSelector) {
    const listCardImovel = document.querySelector(listCardSelector);
    const btnOrder = document.querySelector(btnOrderSelector);
    const btnImv = document.querySelectorAll(btnImvSelector);

    const updateVisibility = () => {
        const checkboxes = listCardImovel.querySelectorAll('.imovel-card input[type="checkbox"]:checked');
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

    listCardImovel.addEventListener('change', (event) => {
        if (event.target.type === 'checkbox') {
            updateVisibility();
        }
    });

    updateVisibility();
}
setupToggleVisibility('.list-card-imovel', '.btn-order', '.btn-imv');

// Função para alternar a seleção de todos os checkboxes e as classes dos botões
function handleImoveisTodosCheckbox() {
    const imoveisTodos = document.querySelector('#imoveisTodos');
    const checkboxes = document.querySelectorAll('.imovel-card input[type="checkbox"]');
    const btnOrder = document.querySelector('.btn-order');
    const btnImv = document.querySelectorAll('.btn-imv');

    const isChecked = imoveisTodos.checked;

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
document.querySelector('#imoveisTodos').addEventListener('change', handleImoveisTodosCheckbox)

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
            // Prevenção: Se o clique foi dentro de um checkbox, interrompe a função
            if (event.target.closest('input[type="checkbox"]')) {
                event.stopPropagation(); // Impede a propagação do evento para os elementos pais
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
    '[data-new-imovel="open"]',
    '[data-new-imovel="container"]',
    '[data-new-imovel="close"]',
    'active',
    true,
    '[data-cancel="container"]'
);
initModal(
    '[data-imovel="open"]',
    '[data-imovel="container"]',
    '[data-imovel="close"]',
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
        checkboxSelector: ".modality-option .imovel-checkbox",
        contentSelector: ".new-imovel-modal .info-content:not(:first-child)",
        disabledClass: "disabled",
        allowSingleSelection: true, // Apenas uma checkbox pode ser selecionada
    });
});

// Modal - Função incluir arquivo
function createUploadArea({
    uploadAreaId,
    fileInputId,
    buttonId,
    validExtensions = ["jpg", "jpeg", "docx", "pdf"],
    maxFileSize = 20 * 1024 * 1024, // 20MB
    onValidFile = (file) => console.log(`Arquivo válido: ${file.name}`),
    onInvalidFile = (file, reason) => console.log(`Arquivo inválido: ${file.name} (${reason})`),
}) {
    const uploadArea = document.getElementById(uploadAreaId);
    const fileInput = document.getElementById(fileInputId);
    const selectFileButton = document.getElementById(buttonId);

    if (!uploadArea || !fileInput || !selectFileButton) {
        console.error("Upload area, file input, or button not found.");
        return;
    }

    // Abrir seletor
    selectFileButton.addEventListener("click", (event) => {
        event.preventDefault();
        fileInput.click();
    });

    // Manipular arquivo
    fileInput.addEventListener("change", (event) => handleFiles(event.target.files));

    // Drag/Drop
    uploadArea.addEventListener("dragover", (event) => {
        event.preventDefault();
        uploadArea.classList.add("dragover");
    });

    uploadArea.addEventListener("dragleave", () => {
        uploadArea.classList.remove("dragover");
    });

    uploadArea.addEventListener("drop", (event) => {
        event.preventDefault();
        uploadArea.classList.remove("dragover");
        handleFiles(event.dataTransfer.files);
    });

    // Validar arquivo
    function handleFiles(files) {
        for (const file of files) {
            const fileExtension = file.name.split(".").pop().toLowerCase();
            if (!validExtensions.includes(fileExtension)) {
                onInvalidFile(file, "Extensão inválida");
                continue;
            }
            if (file.size > maxFileSize) {
                onInvalidFile(file, "Tamanho excedido");
                continue;
            }
            onValidFile(file);
        }
    }
}
createUploadArea({
    uploadAreaId: "upload-area",
    fileInputId: "file-input",
    buttonId: "select-file-button",
    validExtensions: ["jpg", "jpeg", "png", "pdf"],
    maxFileSize: 10 * 1024 * 1024,
    onValidFile: (file) => alert(`Arquivo válido: ${file.name}`),
    onInvalidFile: (file, reason) => alert(`Arquivo inválido: ${file.name} (${reason})`),
});
createUploadArea({
    uploadAreaId: "upload-casamento",
    fileInputId: "casamento-input",
    buttonId: "select-casamento-button",
    validExtensions: ["jpg", "jpeg", "png", "pdf"],
    maxFileSize: 10 * 1024 * 1024,
    onValidFile: (file) => alert(`Arquivo válido: ${file.name}`),
    onInvalidFile: (file, reason) => alert(`Arquivo inválido: ${file.name} (${reason})`),
});

// Modal - Abrir e fechar seções
document.addEventListener("DOMContentLoaded", () => {
    const infoContents = document.querySelectorAll(".new-imovel-modal .info-content");

    infoContents.forEach((content) => {
        setTimeout(() => {
            const header = content.querySelector(".info-header");
            const rightActions = content.querySelector(".right-acts"); // Seleciona o right-acts dentro do info-header

            header.addEventListener("click", (event) => {
                // Verifica se o clique ocorreu dentro do right-acts
                if (event.target.closest(".right-acts")) {
                    return; // Impede a execução da função de abrir/fechar seção
                }

                if (content.classList.contains("disabled")) {
                    return;
                }

                const columnsAndRows = content.querySelectorAll(".info-column, .info-row");

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

// Modal - Função incluir fotos
function createUploadFoto({
    uploadAreaId,
    fileInputId,
    buttonId,
    previewContainerId,
    validExtensions = ["jpg", "jpeg", "png", "pdf"],
    maxFileSize = 10 * 1024 * 1024, // 10MB
    onValidFile = (file) => console.log(`Arquivo válido: ${file.name}`),
    onInvalidFile = (file, reason) => console.log(`Arquivo inválido: ${file.name} (${reason})`),
}) {
    const uploadArea = document.getElementById(uploadAreaId);
    const fileInput = document.getElementById(fileInputId);
    const selectFileButtons = document.querySelectorAll(`#${buttonId}`);
    const previewContainer = document.getElementById(previewContainerId);
    const rightActions = document.querySelector(".right-acts");

    if (!uploadArea || !fileInput || !previewContainer || !rightActions) {
        console.error("Upload area, file input, preview container ou right actions não encontrados.");
        return;
    }

    selectFileButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            fileInput.click();
        });
    });

    fileInput.addEventListener("change", (event) => handleFiles(event.target.files));

    uploadArea.addEventListener("dragover", (event) => {
        event.preventDefault();
        uploadArea.classList.add("dragover");
    });

    uploadArea.addEventListener("dragleave", () => {
        uploadArea.classList.remove("dragover");
    });

    uploadArea.addEventListener("drop", (event) => {
        event.preventDefault();
        uploadArea.classList.remove("dragover");
        handleFiles(event.dataTransfer.files);
    });

    function handleFiles(files) {
        for (const file of files) {
            const fileExtension = file.name.split(".").pop().toLowerCase();
            if (!validExtensions.includes(fileExtension)) {
                onInvalidFile(file, "Extensão inválida");
                continue;
            }
            if (file.size > maxFileSize) {
                onInvalidFile(file, "Tamanho excedido");
                continue;
            }
            onValidFile(file);
            addPreview(file);
        }
    }

    function addPreview(file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const previewElement = document.createElement("div");
            previewElement.classList.add("foto-card", "d-flex-column");
            previewElement.innerHTML = `
                <div class="foto-img">
                    <img src="${event.target.result}" alt="${file.name}">
                </div>
                <div class="foto-actions d-flex-row">
                    <div class="foto-action flex-grow d-flex-row">
                        <label class="switch switch-sm">
                            <input type="checkbox" checked />
                            <span class="slider"></span>
                        </label>
                        <span class="title-small">Ativada</span>
                    </div>
                    <div class="foto-action d-flex-row">
                        <button class="btn btn-icon-sm btn-accent btn-outlined bold">
                            <i class="uil uil-image-redo"></i>
                        </button>
                        <button class="btn btn-icon-sm btn-destructive btn-outlined bold remove-btn">
                            <i class="uil uil-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            previewContainer.appendChild(previewElement);

            previewElement.querySelector(".remove-btn").addEventListener("click", () => {
                previewElement.remove();
                checkPreviewState();
            });

            checkPreviewState();
        };
        reader.readAsDataURL(file);
    }

    function checkPreviewState() {
        if (previewContainer.children.length > 0) {
            uploadArea.classList.add("d-none");
            rightActions.classList.remove("d-none");
        } else {
            uploadArea.classList.remove("d-none");
            rightActions.classList.add("d-none");
        }
    }
}
createUploadFoto({
    uploadAreaId: "upload-fotos",
    fileInputId: "fotos-input",
    buttonId: "select-fotos-button",
    previewContainerId: "fotos-content",
    validExtensions: ["jpg", "jpeg", "png"],
    maxFileSize: 2 * 1024 * 1024, // 2MB
    onValidFile: (file) => alert(`Arquivo válido: ${file.name}`),
    onInvalidFile: (file, reason) => alert(`Arquivo inválido: ${file.name} (${reason})`),
});