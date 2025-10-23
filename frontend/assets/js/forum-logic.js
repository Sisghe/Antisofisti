// forums.js - Gestione logica del forum
document.addEventListener('DOMContentLoaded', function() {
    // Controlla se l'utente è loggato
    const currentUser = sessionStorage.getItem('currentUser');
    const addSphereBtn = document.getElementById('addSphere');
    
    if (addSphereBtn) {
        if (!currentUser) {
            // Ospite: disabilita il pulsante
            addSphereBtn.disabled = true;
            addSphereBtn.textContent = '🔒 Accedi per creare una sfera';
            addSphereBtn.style.opacity = '0.6';
            addSphereBtn.style.cursor = 'not-allowed';
        } else {
            // Utente loggato: abilita il pulsante
            addSphereBtn.disabled = false;
            addSphereBtn.textContent = '➕ Crea nuova sfera';
            addSphereBtn.style.opacity = '1';
            addSphereBtn.style.cursor = 'pointer';
        }
    }
    
    // Aggiungi gestione click per il pulsante (se abilitato)
    if (addSphereBtn && !addSphereBtn.disabled) {
        addSphereBtn.addEventListener('click', function() {
            createNewSphere();
        });
    }
});

function createNewSphere() {
    // Logica per creare una nuova sfera/discussione
    console.log('Creazione nuova sfera...');
    alert('Funzionalità di creazione sfera - da implementare');
}