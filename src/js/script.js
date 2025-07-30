const { jsPDF } = window.jspdf;
const pdf = new jsPDF();


let participants = [];
let certificates = [];
let currentDesign = {
    title: "Certificado de Participação",
    courseName: "Curso de Desenvolvimento Web",
    text: "Certificamos que [NOME] participou do [CURSO], realizado em [DATA], com carga horária de [CARGA_HORARIA] horas.",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    borderColor: "#3498db",
    logo: null,
    fontFamily: "Arial, sans-serif",
    borderStyle: "classic",
    backgroundImage: null,
    logo: null,
    logoPosition: "center",
    logoSize: "100px"
};


function openTab(tabId) {

    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });


    document.getElementById(tabId).classList.add('active');


    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-tab') === tabId) {
            item.classList.add('active');
        }
    });
}

// Função para atualizar a pré-visualização do certificado
function updatePreview() {

    currentDesign.title = document.getElementById('certificate-title').value;
    currentDesign.courseName = document.getElementById('course-name').value;
    currentDesign.text = document.getElementById('certificate-text').value;
    currentDesign.backgroundColor = document.getElementById('background-color').value;
    currentDesign.textColor = document.getElementById('text-color').value;
    currentDesign.borderColor = document.getElementById('border-color').value;
    currentDesign.fontFamily = document.getElementById('font-family').value;
    currentDesign.borderStyle = document.getElementById('border-style').value;

    const logoUpload = document.getElementById('logo-upload');
    if (logoUpload.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (e) {
            currentDesign.logo = e.target.result;
            renderPreview();
        };
        reader.readAsDataURL(logoUpload.files[0]);
    } else {
        currentDesign.logo = null;
    }

    const bgUpload = document.getElementById('background-image-upload');
    if (bgUpload.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (e) {
            currentDesign.backgroundImage = e.target.result;
            renderPreview();
        };
        reader.readAsDataURL(bgUpload.files[0]);
    } else {
        currentDesign.backgroundImage = null;
        renderPreview();
    }
}


// Função para renderizar a pré-visualização
function renderPreview() {
    const preview = document.getElementById('certificate-preview');


    preview.innerHTML = generateCertificateHTML(
        { name: "xxxxx", cpf: "000.000.000-00", email: "exemplo@email.com", workload: "40" },
        "xx/xx/xxxx",
        "40"
    );
}


function getBorderStyle(style, borderColor) {
    const styles = {
        'classic': `
            <!-- Moldura externa -->
            <div style="
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border: 12px solid ${borderColor};
                border-radius: 4px;
                z-index: 0;
            "></div>
            
            <!-- Moldura interna -->
            <div style="
                position: absolute;
                top: 20px;
                left: 20px;
                right: 20px;
                bottom: 20px;
                border: 6px solid ${borderColor};
                border-radius: 2px;
                z-index: 0;
            "></div>
        `,
        'elegant': `
            <!-- Borda fina elegante -->
            <div style="
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border: 2px solid ${borderColor};
                z-index: 0;
            "></div>
            
            <!-- Decoração nos cantos -->
            <div style="
                position: absolute;
                top: 10px;
                left: 10px;
                width: 40px;
                height: 40px;
                border-top: 2px solid ${borderColor};
                border-left: 2px solid ${borderColor};
                z-index: 1;
            "></div>
            <div style="
                position: absolute;
                top: 10px;
                right: 10px;
                width: 40px;
                height: 40px;
                border-top: 2px solid ${borderColor};
                border-right: 2px solid ${borderColor};
                z-index: 1;
            "></div>
            <div style="
                position: absolute;
                bottom: 10px;
                left: 10px;
                width: 40px;
                height: 40px;
                border-bottom: 2px solid ${borderColor};
                border-left: 2px solid ${borderColor};
                z-index: 1;
            "></div>
            <div style="
                position: absolute;
                bottom: 10px;
                right: 10px;
                width: 40px;
                height: 40px;
                border-bottom: 2px solid ${borderColor};
                border-right: 2px solid ${borderColor};
                z-index: 1;
            "></div>
        `,
        'ornate': `
            <!-- Borda ornamentada -->
            <div style="
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border: 8px solid transparent;
                border-image: repeating-linear-gradient(45deg, ${borderColor}, ${borderColor} 10px, transparent 10px, transparent 20px) 10;
                z-index: 0;
            "></div>
            
            <!-- Decoração adicional -->
            <div style="
                position: absolute;
                top: 15px;
                left: 15px;
                right: 15px;
                bottom: 15px;
                border: 1px dashed ${borderColor};
                z-index: 0;
            "></div>
        `,
        'modern': `
            <!-- Borda angular moderna -->
            <div style="
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, ${borderColor} 10px, transparent 10px) 0 0,
                            linear-gradient(-135deg, ${borderColor} 10px, transparent 10px) 0 100%,
                            linear-gradient(45deg, ${borderColor} 10px, transparent 10px) 100% 0,
                            linear-gradient(-45deg, ${borderColor} 10px, transparent 10px) 100% 100%;
                background-size: 50% 50%;
                background-repeat: no-repeat;
                z-index: 0;
            "></div>
            
            <!-- Linhas horizontais e verticais -->
            <div style="
                position: absolute;
                top: 50%;
                left: 20px;
                right: 20px;
                height: 1px;
                background: ${borderColor};
                z-index: 1;
            "></div>
            <div style="
                position: absolute;
                left: 50%;
                top: 20px;
                bottom: 20px;
                width: 1px;
                background: ${borderColor};
                z-index: 1;
            "></div>
        `,
        'vintage': `
        <!-- Borda vintage -->
            <div style="
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border: 15px solid transparent;
                border-image: url('data:image/svg+xml;utf8,&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;100&quot; height=&quot;100&quot; viewBox=&quot;0 0 100 100&quot;&gt;&lt;path d=&quot;M0,0 L100,0 L100,100 L0,100 Z&quot; fill=&quot;none&quot; stroke=&quot;${borderColor.replace('#', '%23')}&quot; stroke-width=&quot;10&quot; stroke-dasharray=&quot;15,10,5,10&quot; /&gt;&lt;/svg&gt;') 15;
                z-index: 0;
            "></div>
            
            <!-- Cantos decorados -->
            <div style="
                position: absolute;
                top: 5px;
                left: 5px;
                width: 30px;
                height: 30px;
                border-top: 3px solid ${borderColor};
                border-left: 3px solid ${borderColor};
                z-index: 1;
            "></div>
            <div style="
                position: absolute;
                top: 5px;
                right: 5px;
                width: 30px;
                height: 30px;
                border-top: 3px solid ${borderColor};
                border-right: 3px solid ${borderColor};
                z-index: 1;
            "></div>
            <div style="
                position: absolute;
                bottom: 5px;
                left: 5px;
                width: 30px;
                height: 30px;
                border-bottom: 3px solid ${borderColor};
                border-left: 3px solid ${borderColor};
                z-index: 1;
            "></div>
            <div style="
                position: absolute;
                bottom: 5px;
                right: 5px;
                width: 30px;
                height: 30px;
                border-bottom: 3px solid ${borderColor};
                border-right: 3px solid ${borderColor};
                z-index: 1;
            "></div>
        `,

         'frame': `
            <div style="
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: url('${currentDesign.backgroundImage}');
                background-size: cover;
                background-position: center;
                z-index: 0;
                pointer-events: none;
            "></div>
        `,
        
        'none': ''
    };

    return styles[style] || '';
}

// Função para gerar o HTML de um certificado individual
function generateCertificateHTML(participant, date, workload) {
    const backgroundStyle = currentDesign.backgroundImage && currentDesign.borderStyle !== 'frame' ?
        `background-image: url('${currentDesign.backgroundImage}');
                 background-size: cover;
                 background-position: center;
                 background-repeat: no-repeat;` :
        `background-color: ${currentDesign.backgroundColor};`;

    const logoStyle = `
                max-height: ${currentDesign.logoSize};
                margin-bottom: 30px;
                ${currentDesign.logoPosition === 'left' ? 'float: left; margin-right: 20px;' : ''}
                ${currentDesign.logoPosition === 'right' ? 'float: right; margin-left: 20px;' : ''}
            `;

    return `
                <div class="certificate-template" style="
                    ${backgroundStyle}
                    color: ${currentDesign.textColor};
                    font-family: ${currentDesign.fontFamily};
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 0 25px rgba(0,0,0,0.1);
                ">
                    ${getBorderStyle(currentDesign.borderStyle, currentDesign.borderColor)}
                    
                    <div style="padding: 60px; text-align: center; height: 100%; box-sizing: border-box; position: relative; z-index: 1;">
                        ${currentDesign.logo ? `
                        <div style="text-align: ${currentDesign.logoPosition === 'center' ? 'center' :
                currentDesign.logoPosition === 'left' ? 'left' : 'right'}; 
                             clear: both;">
                            <img src="${currentDesign.logo}" style="${logoStyle}">
                        </div>` : ''}
                        
                        <div style="margin-bottom: 20px;">
                            <h1 style="
                                font-size: 36px; 
                                margin: 0 0 10px 0;
                                color: ${currentDesign.borderColor};
                                font-weight: bold;
                                text-transform: uppercase;
                                letter-spacing: 2px;
                            ">
                                ${currentDesign.title}
                            </h1>
                            <div style="
                                width: 100px;
                                height: 3px;
                                background: ${currentDesign.borderColor};
                                margin: 0 auto 20px auto;
                            "></div>
                            <p style="
                                font-style: italic;
                                color: ${currentDesign.textColor};
                                margin: 0;
                            ">
                                ${currentDesign.courseName}
                            </p>
                        </div>
                        
                        <div style="
                            margin: 60px 0;
                            padding: 0 20px;
                            font-size: 20px;
                            line-height: 1.8;
                            text-align: center;
                        ">
                            <p style="margin-bottom: 30px;">
                                ${currentDesign.text
            .replace('[NOME]', `<strong style="font-size: 22px;">${participant.name}</strong>`)
            .replace('[CURSO]', `<em>${currentDesign.courseName}</em>`)
            .replace('[DATA]', date)
            .replace('[CARGA_HORARIA]', `${workload} horas`)}
                            </p>
                        </div>
                        
                        <div style="margin-top: 100px;">
                            <div style="
                                width: 300px;
                                margin: 0 auto;
                                padding-top: 20px;
                                text-align: center;
                            ">
                                <p style="margin: 5px 0; font-weight: bold;">___________________________</p>
                                <p style="margin: 5px 0; font-size: 16px;">Assinatura do Diretor</p>
                                <p style="margin: 5px 0; font-size: 14px; font-style: italic;">${formatDate(new Date())}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
}


// Função auxiliar para formatar data
function formatDate(date) {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
}

// Função para importar participantes
function importParticipants() {
    const fileInput = document.getElementById('participants-file');
    const file = fileInput.files[0];

    if (!file) {
        alert('Por favor, selecione um arquivo CSV.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        try {
            const content = e.target.result;
            const lines = content.split('\n').filter(line => line.trim() !== '');

            if (lines.length < 2) {
                alert('O arquivo CSV deve ter pelo menos um participante além do cabeçalho.');
                return;
            }

            participants = [];

            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].split(',');
                if (parts.length >= 3) {
           
                    let workloadValue = 40; 
                    if (parts[3]) {
                        workloadValue = parseInt(parts[3].trim());
                        if (isNaN(workloadValue)) {
                            workloadValue = parseInt(document.getElementById('workload').value) || 40;
                        }
                    } else {
                        workloadValue = parseInt(document.getElementById('workload').value) || 40;
                    }

                    participants.push({
                        name: parts[0].trim(),
                        cpf: parts[1].trim(),
                        email: parts[2].trim(),
                        workload: workloadValue
                    });
                }
            }

            if (participants.length === 0) {
                alert('Nenhum participante válido encontrado no arquivo.');
                return;
            }

            updateParticipantsTable();
            alert(`${participants.length} participantes importados com sucesso!`);

        } catch (error) {
            console.error('Erro ao processar arquivo:', error);
            alert('Erro ao processar o arquivo. Verifique o formato do CSV.');
        }
    };

    reader.onerror = function () {
        alert('Erro ao ler o arquivo. Tente novamente.');
    };

    reader.readAsText(file);
}

// Função para atualizar a tabela de participantes
function updateParticipantsTable() {
    const tableBody = document.getElementById('participants-list');
    tableBody.innerHTML = '';

    participants.forEach(participant => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${participant.name}</td>
                    <td>${participant.cpf}</td>
                    <td>${participant.email}</td>
                    <td>${participant.workload}</td>
                `;
        tableBody.appendChild(row);
    });
}


function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Função para gerar PDF a partir do HTML
async function generatePDF(htmlContent, fileName) {
    try {
        if (!window.jspdf) {
            throw new Error("jsPDF não está carregado! Verifique a ordem dos scripts.");
        }

        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.style.width = '1123px';
        tempDiv.style.height = '794px';
        tempDiv.innerHTML = htmlContent;
        document.body.appendChild(tempDiv);


        const canvas = await html2canvas(tempDiv, {
            scale: 2,
            logging: false,
            useCORS: true,
            scrollX: 0,
            scrollY: 0,
            windowWidth: 1123,
            windowHeight: 794
        });


        document.body.removeChild(tempDiv);

        const imgData = canvas.toDataURL('image/png');

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('landscape', 'mm', 'a4');


        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);

        return pdf;
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        throw error;
    }
}



// Função para gerar todos os certificados
async function generateAllCertificates() {
    try {
        const eventDateInput = document.getElementById('event-date');
        const eventDate = eventDateInput.value;
        const defaultWorkload = parseInt(document.getElementById('workload').value) || 40;

        if (!eventDate) {
            alert('Por favor, informe a data do evento.');
            return;
        }

        if (participants.length === 0) {
            alert('Nenhum participante foi importado. Importe a lista de participantes primeiro.');
            return;
        }

        document.getElementById('generation-progress').style.display = 'block';

        certificates = [];
        const progressDiv = document.getElementById('progress');
        const progressText = document.getElementById('progress-text');
        progressDiv.style.width = '0%';
        progressDiv.textContent = '0%';
        progressText.textContent = 'Iniciando geração...';

        const formattedDate = formatDateCorrectly(eventDate);

        for (let i = 0; i < participants.length; i++) {
            const participant = participants[i];
            const workload = parseInt(participant.workload) || defaultWorkload;

            const certificate = {
                participant: participant,
                date: formattedDate,
                workload: workload,
                html: generateCertificateHTML(participant, formattedDate, workload),
                number: `CERT-${Date.now()}-${i}`
            };

            certificates.push(certificate);

            const progress = Math.round(((i + 1) / participants.length) * 100);
            progressDiv.style.width = `${progress}%`;
            progressDiv.textContent = `${progress}%`;
            progressText.textContent = `Gerando certificado ${i + 1} de ${participants.length}: ${participant.name}`;

            await new Promise(resolve => setTimeout(resolve, 50));
        }

        progressText.textContent = `${participants.length} certificados gerados com sucesso!`;
        updateCertificatesTable();
        alert('Certificados gerados com sucesso! Agora você pode baixá-los.');

    } catch (error) {
        console.error('Erro ao gerar certificados:', error);
        document.getElementById('progress-text').textContent = 'Erro ao gerar certificados.';
        alert('Ocorreu um erro ao gerar os certificados. Verifique o console para mais detalhes.');
    }
}


function formatDateCorrectly(dateString) {

    const date = new Date(dateString);


    if (isNaN(date.getTime())) {
        console.error('Data inválida:', dateString);
        return 'Data inválida';
    }


    const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);


    const day = adjustedDate.getDate().toString().padStart(2, '0');
    const month = (adjustedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = adjustedDate.getFullYear();

    return `${day}/${month}/${year}`;
}


// Função para baixar um certificado como PDF
async function downloadCertificateAsPDF(certNumber) {
    try {
        const cert = certificates.find(c => c.number === certNumber);
        if (!cert) {
            alert('Certificado não encontrado.');
            return;
        }

        const fileName = `Certificado_${cert.participant.name.replace(/\s+/g, '_')}.pdf`;
        const pdf = await generatePDF(cert.html, fileName);
        pdf.save(fileName);

    } catch (error) {
        console.error('Erro ao baixar certificado:', error);
        alert('Erro ao baixar o certificado como PDF.');
    }
}

// Função para baixar todos os certificados como PDFs individuais
async function downloadAllCertificatesAsPDF() {
    if (certificates.length === 0) {
        alert('Nenhum certificado foi gerado ainda.');
        return;
    }

    const progressDiv = document.getElementById('progress');
    const progressText = document.getElementById('progress-text');
    progressDiv.style.width = '0%';
    progressDiv.textContent = '0%';
    progressText.textContent = 'Preparando para download...';

    try {
        for (let i = 0; i < certificates.length; i++) {
            const cert = certificates[i];
            const fileName = `Certificado_${cert.participant.name.replace(/\s+/g, '_')}.pdf`;


            const progress = Math.round(((i + 1) / certificates.length) * 100);
            progressDiv.style.width = `${progress}%`;
            progressDiv.textContent = `${progress}%`;
            progressText.textContent = `Baixando ${i + 1} de ${certificates.length}: ${cert.participant.name}`;


            const pdf = await generatePDF(cert.html, fileName);
            pdf.save(fileName);


            await new Promise(resolve => setTimeout(resolve, 500));
        }

        progressText.textContent = 'Todos os certificados foram baixados!';
        alert('Download de todos os certificados concluído!');

    } catch (error) {
        console.error('Erro ao baixar certificados:', error);
        progressText.textContent = 'Erro durante o download.';
        alert('Ocorreu um erro durante o download dos certificados.');
    }
}

// Função para visualizar um certificado
function viewCertificate(certNumber) {
    const cert = certificates.find(c => c.number === certNumber);
    if (!cert) {
        alert('Certificado não encontrado.');
        return;
    }

    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Pré-visualização do Certificado - ${cert.participant.name}</title>
                    <style>
                        body { 
                            margin: 0; 
                            padding: 20px; 
                            display: flex; 
                            justify-content: center; 
                            background-color: #f5f5f5;
                        }
                        .certificate-container { 
                            width: 794px; 
                            height: 1123px; 
                            box-shadow: 0 0 20px rgba(0,0,0,0.1);
                        }
                    </style>
                </head>
                <body>
                    <div class="certificate-container">
                        ${cert.html}
                    </div>
                    <script>
                        window.onload = function() {
                            window.print();
                        };
                    <\/script>
                </body>
                </html>
            `);
    newWindow.document.close();
}

// Função para atualizar a tabela de certificados
function updateCertificatesTable() {
    const tableBody = document.getElementById('certificates-list');
    tableBody.innerHTML = '';

    certificates.forEach(cert => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${cert.participant.name}</td>
                    <td>${cert.participant.cpf}</td>
                    <td>${cert.date}</td>
                    <td>
                        <button class="download-cert-btn" data-cert="${cert.number}">Baixar PDF</button>
                        <button class="view-cert-btn" data-cert="${cert.number}">Visualizar</button>
                    </td>
                `;
        tableBody.appendChild(row);
    });


    document.querySelectorAll('.download-cert-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            downloadCertificateAsPDF(this.getAttribute('data-cert'));
        });
    });

    document.querySelectorAll('.view-cert-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            viewCertificate(this.getAttribute('data-cert'));
        });
    });
}

// Inicialização do sistema
document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function () {
            openTab(this.getAttribute('data-tab'));
        });
    });


    document.getElementById('update-preview-btn').addEventListener('click', updatePreview);


    document.getElementById('import-participants-btn').addEventListener('click', importParticipants);


    document.getElementById('generate-certificates-btn').addEventListener('click', generateAllCertificates);


    document.getElementById('download-all-btn').addEventListener('click', downloadAllCertificatesAsPDF);


    updatePreview();
});

