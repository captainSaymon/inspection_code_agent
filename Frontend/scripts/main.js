document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyze-btn');
    const codeInput = document.getElementById('code-input');
    const languageSelect = document.getElementById('language-select');
    const loader = document.getElementById('loader');
    const reportSection = document.getElementById('report-section');
    const reportContent = document.getElementById('report-content');
    const copyCodeBtn = document.getElementById('copy-code-btn');

    analyzeBtn.addEventListener('click', async () => {
        const code = codeInput.value.trim();
        const language = languageSelect.value;

        if (!code) {
            alert('Proszę najpierw wkleić kod do analizy!');
            return;
        }

        analyzeBtn.disabled = true;
        loader.classList.remove('hidden');
        reportSection.classList.add('hidden');
        copyCodeBtn.style.display = 'none';

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code: code,
                    language: language
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                reportContent.innerHTML = marked.parse(data.report);
                reportSection.classList.remove('hidden');

                const hasCode = reportContent.querySelector('pre code');
                if (hasCode) {
                    copyCodeBtn.style.display = 'block';
                }
                else {
                    copyCodeBtn.style.display = 'none';
                }
            }
            else {
                reportContent.innerHTML = `<p style="color: #ef4444;"><strong>Błąd serwera:</strong> ${data.error || 'Nieznany błąd.'}</p>`;
                reportSection.classList.remove('hidden');
                copyCodeBtn.style.display = 'none';
            }

        }
        catch (error) {
            console.error('Błąd podczas komunikacji z API:', error);
            reportContent.innerHTML = `<p style="color: #ef4444;"><strong>Błąd połączenia:</strong> Nie można skomunikować się z serwerem aplikacji.</p>`;
            reportSection.classList.remove('hidden');
        }
        finally {
            analyzeBtn.disabled = false;
            loader.classList.add('hidden');
        }
    });

    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', () => {
            const codeBlock = reportContent.querySelector('pre code');
            
            if (codeBlock) {
                const textToCopy = codeBlock.innerText;
                
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalText = copyCodeBtn.innerHTML;
                    copyCodeBtn.innerHTML = 'Skopiowano';
                    copyCodeBtn.style.backgroundColor = '#10b981';
                    
                    setTimeout(() => {
                        copyCodeBtn.innerHTML = originalText;
                        copyCodeBtn.style.backgroundColor = '';
                    }, 2000);
                }).catch(err => {
                    console.error('Błąd podczas kopiowania: ', err);
                    alert('Nie udało się skopiować kodu automatycznie.');
                });
            } else {
                alert('W raporcie nie znaleziono żadnego bloku kodu do skopiowania!');
            }
        });
    }
});