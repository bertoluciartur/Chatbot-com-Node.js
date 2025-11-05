const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); 
const client = new Client();
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});
client.initialize();
const delay = ms => new Promise(res => setTimeout(res, ms));
const userSessions = {}; 
client.on('message', async msg => {
    const chatId = msg.from;
    const bodyText = msg.body ? msg.body.trim() : '';
    const sendMainMenu = async (chatId, contactName) => {
        const chat = await msg.getChat();
        await chat.sendStateTyping(); 
        await delay(1000); 
        
        const welcomeMessage = 
            `Olá! ${contactName.split(" ")[0]} Sou o _assistente virtual_ da Dra. Ariane! \n` +
            'Como posso ajudá-lo hoje? \n' +
            '*_Digite apenas o número da opção desejada:_*\n\n' +
            '1 - Primeira consulta particular\n' +
            '2 - Primeira consulta Unimed\n' +
            '3 - Acompanhamento particular\n' +
            '4 - Acompanhamento Unimed\n' +
            '5 - Tirzepatida (Horários de aplicação, Valores, Dúvidas e etc)\n' +
            '6 - Endereço\n' +
            '7 - Encerrar atendimento';
            '\nSe é apenas envio de exames ou nenhuma das opções te atendeu, apenas envie-os ou *ESCREVA* sua dúvida. Aúdios não serão respondidos.' 
        await client.sendMessage(chatId, welcomeMessage);
        await chat.clearState();
        userSessions[chatId] = 'MAIN_MENU'; 
    };
    if (bodyText.match(/(menu|Menu|MENU|voltar)/i) && msg.from.endsWith('@c.us')) {
        const contact = await msg.getContact(); 
        await sendMainMenu(chatId, contact.pushname);
        return;
    }
    if (bodyText.match(/(encerrar|7)/i) && (userSessions[chatId] === 'MAIN_MENU' || bodyText === '7')) {
        const chat = await msg.getChat();
        await chat.sendStateTyping();
        await delay(1000);
        await client.sendMessage(msg.from, 'Entendido. Atendimento encerrado.');
        await chat.clearState();
        userSessions[chatId] = null; 
        return;
    }
    if (bodyText.match(/(0|menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) && msg.from.endsWith('@c.us')) {
        const contact = await msg.getContact(); 
        await sendMainMenu(chatId, contact.pushname);
        return; 
    }
    if (userSessions[chatId] === 'MAIN_MENU' || !userSessions[chatId]) {
        if (bodyText === '1' && msg.from.endsWith('@c.us')) {
            const chat = await msg.getChat();
            await chat.sendStateTyping(); 
            await delay(1000);
            await client.sendMessage(msg.from, 'Seja Bem-vindo(a)! Peço, por gentileza, que me envie seu nome completo, data de nascimento e CPF para que possamos realizar seu cadastro.\nSegue os valores abaixo:');
            const media = MessageMedia.fromFilePath("valorconsulta.jpeg");
            await client.sendMessage(msg.from, media);
            await client.sendMessage(msg.from, '(Digite *0* ou *Menu* para voltar)');
            await chat.clearState();
            userSessions[chatId] = null; 
            return;
        }
        if (bodyText === '2' && msg.from.endsWith('@c.us')) {
            const chat = await msg.getChat();
            await chat.sendStateTyping();
            await delay(1000);
            await client.sendMessage(msg.from, 'Seja Bem-vindo(a)! Peço, por gentileza, que me envie seu nome completo, data de nascimento, CPF e número da carteirinha para que possamos realizar seu cadastro. (Digite *0* ou *Menu* para voltar)');
            await chat.clearState();
            userSessions[chatId] = null;
            return;
        }
        if (bodyText === '3' && msg.from.endsWith('@c.us')) {
            const chat = await msg.getChat();
            await chat.sendStateTyping(); 
            await delay(1000);
            await client.sendMessage(msg.from, 'Que ótimo! Ficamos felizes em rever você. Vou te encaminhar para um atendente. O valor do acompanhamento particular é de R$300,00. Poderia nos adiantar se prefere conulta Online ou Presencial? (Digite *0* ou *Menu* para voltar)');
            await chat.clearState();
            userSessions[chatId] = null;
            return;
        }
        if (bodyText === '4' && msg.from.endsWith('@c.us')) {
            const chat = await msg.getChat();
            await chat.sendStateTyping(); 
            await delay(1000);
            await client.sendMessage(msg.from, 'Que ótimo! Ficamos felizes em rever você. Vou te encaminhar para um atendente. Por gentileza, pode me enviar o número da sua carteirinha? (Digite *0* ou *Menu* para voltar)');
            await chat.clearState();
            userSessions[chatId] = null;
            return;
        }
        if (bodyText === '5' && msg.from.endsWith('@c.us')) {
            const chat = await msg.getChat();

            await chat.sendStateTyping(); 
            await delay(1000);

            await client.sendMessage(msg.from, 
                'Ok! No que podemos te ajudar em relação à Tirzepatida?\n\n' +
                '1 - Quero começar a aplicar (Requer consulta)\n' +
                '2 - Valores e Pacotes\n' +
                '3 - Horários disponíveis para aplicação\n\n' +
                'Digite *0* ou *Menu* para voltar ao menu principal.'
            );
            await chat.clearState();
            
            userSessions[chatId] = 'TIRZEPATIDA_MENU';
            return; 
        }
        if (bodyText === '6' && msg.from.endsWith('@c.us')) {
            const chat = await msg.getChat();
            await chat.sendStateTyping(); 
            await delay(1000);

            await client.sendMessage(msg.from, 
                '📍 Nosso endereço é na Clínica Salute.\n\n' +
                'Link do Mapa:\n' +
                'https://www.google.com/maps/place/Cl%C3%ADnica+Salute/data=!4m7!3m6!1s0x9495b74d0f470cf3:0x427a7e229ce7e5f8!8m2!3d-21.9381241!4d-50.5153962!16s%2Fg%2F11h3bgz9yv!19sChIJ8wxHD023lZQR-OXnnCJ-ekI?authuser=0&hl=pt-BR&rclk=1' +
                '\n\n(Digite *0* ou *Menu* para voltar)'
            );
            await chat.clearState();
            userSessions[chatId] = null;
            return;
        }
    }
    if (userSessions[chatId] === 'TIRZEPATIDA_MENU') {
        const chat = await msg.getChat();
        
        // Sub-opção 1
        if (bodyText === '1' && msg.from.endsWith('@c.us')) {
            await chat.sendStateTyping();
            await delay(1000);
            await client.sendMessage(msg.from, 'Que legal! Antes de tudo, você precisa passar por uma consulta para realizar alguns exames e entender como funciona. Seria pela Unimed ou Particular? Digite *Unimed* ou *Particular* para continuar.');
            await chat.clearState();
            userSessions[chatId] = 'TIRZEPATIDA_PLANO_CHOICE';
            return;
        }
        if (bodyText === '2' && msg.from.endsWith('@c.us')) {
            await chat.sendStateTyping();
            await delay(1000);
            await client.sendMessage(msg.from, 
                '✅ **Valores e Pacotes Tirzepatida:**\n' );
            const media1 = MessageMedia.fromFilePath('mounjaro.jpeg'); // SEM PASTA
            await client.sendMessage(msg.from, media1); 
            const media2 = MessageMedia.fromFilePath('mounjaro2.jpeg'); // SEM PASTA
            await client.sendMessage(msg.from, media2);
            await client.sendMessage(msg.from, 
                '*As aplicações não possuem custo*.\n\n' +
                'Digite *0* ou *Menu* para voltar.'
            );
            await chat.clearState();
            userSessions[chatId] = null;
            return;
        }
        if (bodyText === '3' && msg.from.endsWith('@c.us')) {
            await chat.sendStateTyping();
            await delay(1000);
            await client.sendMessage(msg.from, 'Ok! Nossos horários de aplicação são: *Terça-feira e Quinta-feira* das *13:00 às 17:00* /(Mediante à agendamento)/. Para agendar, digite *Atendente* ou *Menu* para voltar ao menu principal.');
            await chat.clearState();
            userSessions[chatId] = null; 
            return;
        }
        await chat.sendStateTyping();
        await delay(1000);
        await client.sendMessage(msg.from, 'Opção inválida. Por favor, digite 1, 2 ou 3, ou digite *0* ou *Menu* para voltar.');
        await chat.clearState();
        return; 
    }
    if (userSessions[chatId] === 'TIRZEPATIDA_PLANO_CHOICE') {
        if (bodyText.match(/(unimed|Unimed|UNIMED)/i) && msg.from.endsWith('@c.us')) {
            const chat = await msg.getChat();
            await chat.sendStateTyping(); 
            await delay(1000);
            await client.sendMessage(msg.from, 'Ok! Pode me enviar o número da sua carteirinha? Já vou te encaminhar para um atendente. (Digite *0* ou *Menu* para voltar)');
            await chat.clearState();
            userSessions[chatId] = null; 
            return;
        }
        if (bodyText.match(/(particular|Particular|PARTICULAR)/i) && msg.from.endsWith('@c.us')) {
            const chat = await msg.getChat();
            await chat.sendStateTyping(); 
            await delay(1000);
            await client.sendMessage(msg.from, 'Ok! Consulta é no valor de R$150. Já vou te encaminhar para um atendente. (Digite *0* ou *Menu* para voltar)');
            await chat.clearState();
            userSessions[chatId] = null;
            return;
        }
        await chat.sendStateTyping();
        await delay(1000);
        await client.sendMessage(msg.from, 'Escolha inválida. Por favor, digite *0* ou *Menu* para voltar.');
        await chat.clearState();
        return; 
    }
});