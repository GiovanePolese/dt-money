import { FormEvent, useState, useContext } from 'react'
import Modal from 'react-modal'
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { TransactionsContext } from '../../TransactionsContext'
import { Container, RadioBox, TransactionTypeContainer } from './styles'

interface newTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: newTransactionModalProps) {
  const { createTransaction } = useContext(TransactionsContext)

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('deposit');
  const [category, setCategory] = useState('');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    })

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <button type="button" onClick={onRequestClose} className="react-modal-close">
          <img src={closeImg} alt="Fechar modal" />
        </button>

        <input 
          placeholder="Titulo"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <input 
          type="number" 
          placeholder="Valor"
          value={amount} 
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox type="button" onClick={() => {setType('deposit')}} isActive={type === 'deposit'}>
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox type="button" onClick={() => {setType('withdraw')}} isActive={type === 'withdraw'}>
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input 
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />
        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  );
}