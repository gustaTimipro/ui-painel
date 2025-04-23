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

// Chat - Envio Function
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('barra-de-envio-chat');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');

    input.focus();

    function sendMessage() {
        const message = input.value.trim();
        if (!message) return;

        addChatMessage(message, 'send');
        input.value = '';
        scrollToBottom();

        sendButton.disabled = true;
        sendButton.innerHTML = '<i class="bx bx-loader-circle bx-spin white-color"></i>';

        setTimeout(() => {
            sendButton.disabled = false;
            sendButton.innerHTML = '<i class="bx bx-send white-color"></i>';

            // Resposta automática
            const responses = [
                "Recebido! Logo entraremos em contato. 😊",
                "Obrigado pelo seu interesse! Um de nossos corretores responderá em breve.",
                "Mensagem recebida com sucesso! Estamos verificando as informações para te responder.",
                "Agradecemos seu contato! Retornaremos em breve com mais detalhes."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            addChatMessage(randomResponse, 'receive');
            scrollToBottom();

            input.focus();
        }, 1000 + Math.random() * 2000);
    }

    sendButton.addEventListener('click', sendMessage);

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
        }
    });

    function addChatMessage(text, type = 'send') {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type === 'send' ? 'send' : 'receive'}`;
        messageElement.innerHTML = `
            <span class="body-medium info-message">${escapeHtml(text)}</span>
            <span class="label-small neutral-text hour-message">${getCurrentDateTime()}</span>
        `;

        messageElement.style.opacity = '0';
        messageElement.style.transform = type === 'send' ? 'translateX(20px)' : 'translateX(-20px)';
        messageElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        chatMessages.appendChild(messageElement);

        setTimeout(() => {
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateX(0)';
        }, 10);
    }

    function getCurrentDateTime() {
        const now = new Date();
        return now.toLocaleDateString('pt-BR') + ' - ' + now.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});

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
initModal('[data-agendar-visita="open"]', '[data-agendar-visita="container"]', '[data-agendar-visita="close"]', 'active', false, '[data-cancel="container"]');
initModal('[data-registrar-proposta="open"]', '[data-registrar-proposta="container"]', '[data-registrar-proposta="close"]', 'active', false, '[data-cancel="container"]');