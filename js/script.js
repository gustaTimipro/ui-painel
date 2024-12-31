// função para dropdowns
document.addEventListener('click', function (event) {
    const clickedDropdownButton = event.target.closest('.btn-dropdown');
    let isGroupOpen = false;

    document.querySelectorAll('.dropdown-group').forEach(group => {
        const relatedButton = group.previousElementSibling;

        if (clickedDropdownButton === relatedButton) {
            isGroupOpen = group.style.display === 'flex';
            group.style.display = isGroupOpen ? 'none' : 'flex';
        } else {
            group.style.display = 'none';
        }
    });

    if (!clickedDropdownButton) {
        document.querySelectorAll('.dropdown-group').forEach(group => {
            group.style.display = 'none';
        });
    }
});

// Função para monitorar o estado checked de cada switch
function monitorSwitch(id) {
     const checkbox = document.getElementById(id);
     checkbox.addEventListener('change', function () {
         console.log(`Switch ${id} está ${(checkbox.checked ? 'ativado' : 'desativado')}`);
     });
 }

// Aplicar a função a cada switch
 monitorSwitch('switch-lg');
 monitorSwitch('switch-md');
 monitorSwitch('switch-sm');

document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('blur', () => {
        input.classList.add('touched');
    });
});

// onchange="toggleContent()"
// <div id="contentDiv" class="content-div">Conteúdo 1</div>
function toggleContent() {
    const contentDiv = document.getElementById("contentDiv");
    const isChecked = document.getElementById("toggleSwitch").checked;

    contentDiv.style.opacity = 0;
    setTimeout(() => {
        contentDiv.innerText = isChecked ? "Conteúdo 2" : "Conteúdo 1";
        contentDiv.style.opacity = 1;
    }, 300);
}