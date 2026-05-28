export interface AiResponsePattern {
  keywords: string[]
  response: string
}

export const AI_RESPONSES: AiResponsePattern[] = [
  {
    keywords: ['histórico', 'historico', 'transcript'],
    response:
      'Para solicitar seu **Histórico Escolar**, acesse a seção *Documentos* no menu lateral e clique em "Nova Solicitação". O prazo de emissão é de até **5 dias úteis**. Após aprovação, o documento ficará disponível para download neste portal. Posso te ajudar com mais alguma coisa?',
  },
  {
    keywords: ['matrícula', 'matricula', 'rematrícula', 'rematricula', 'enrollment'],
    response:
      'O período de **Rematrícula 2024.2** está aberto até **30 de novembro de 2024**. Para realizar a rematrícula, acesse *Fluxos do Aluno > Rematrícula* no dashboard. Certifique-se de não ter débitos financeiros pendentes. Precisa de mais informações?',
  },
  {
    keywords: ['boleto', 'financeiro', 'pagamento', 'mensalidade'],
    response:
      'Seus boletos e informações financeiras estão disponíveis em *Financeiro e Boletos* no dashboard. Caso tenha dificuldades com pagamento, a secretaria oferece opções de parcelamento — entre em contato diretamente com a nossa equipe pelo ramal **1234** ou por e-mail em **financeiro@fatec.sp.gov.br**.',
  },
  {
    keywords: ['nota', 'notas', 'grade', 'boletim'],
    response:
      'Suas notas estão disponíveis no dashboard, seção *Minhas Notas*. Para ver o boletim completo com detalhamento de P1, P2 e trabalhos, clique em *Ver Boletim Completo*. Lembre-se: para aprovação, a média mínima é **5,0** e frequência mínima de **75%**.',
  },
  {
    keywords: ['estágio', 'estagio', 'internship'],
    response:
      'Para solicitar documentação para estágio (Atestado de Matrícula, Histórico Escolar ou Declaração de Frequência), acesse a seção *Documentos* e escolha "Nova Solicitação". Para termo de compromisso de estágio, procure a **Coordenadoria de Estágios** pessoalmente ou pelo e-mail **estagios@fatec.sp.gov.br**.',
  },
  {
    keywords: ['senha', 'acesso', 'login', 'password'],
    response:
      'Para redefinir sua senha de acesso ao portal, clique em **"Esqueceu a senha?"** na tela de login. Você receberá um link de redefinição no e-mail institucional cadastrado. Caso não lembre seu e-mail institucional, entre em contato com a secretaria pessoalmente com um documento de identificação.',
  },
  {
    keywords: ['horario', 'horário', 'schedule', 'aula'],
    response:
      'Sua grade de horários está disponível na seção **Agenda** no menu lateral. Lá você encontra os horários de todas as disciplinas, salas e professores para o semestre atual. Em caso de conflito de horários, consulte a coordenação do curso.',
  },
  {
    keywords: ['professor', 'professora', 'docente'],
    response:
      'Para entrar em contato com professores, você pode verificar o e-mail institucional deles no *Portal do Professor* ou solicitar à secretaria. Em caso de ausência de professor, a reposição de aula será comunicada via **e-mail institucional** e no mural do curso.',
  },
]

export const DEFAULT_RESPONSE =
  'Entendo sua dúvida! Para questões mais específicas, nossa equipe da secretaria está disponível:\n\n📍 **Presencialmente**: Bloco A, Térreo — Seg a Sex, 8h às 22h\n📧 **E-mail**: secretaria@fatec.sp.gov.br\n📞 **Telefone**: (11) 0000-0000\n\nPosso te ajudar com algo mais?'

export const GREETING_MESSAGE =
  'Olá! Sou a **Assistente Virtual da Secretaria Acadêmica Faaahtech**. 👋\n\nEstou aqui para te ajudar com:\n• 📄 Solicitação de documentos\n• 📅 Informações sobre matrícula e rematrícula\n• 📊 Dúvidas sobre notas e frequência\n• 💰 Questões financeiras\n• 🎓 Documentação para estágio\n\nComo posso te ajudar hoje?'
