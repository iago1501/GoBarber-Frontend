import React, { useState } from 'react';

import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Appointment,
  Section,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setDelectedDate] = useState(new Date());

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button onClick={signOut} type="button">
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars2.githubusercontent.com/u/13649073?s=460&u=7171c01e60916597984c2802b7753cef11563e9d&v=4"
                alt="Iago Espinoza"
              />
              <strong>Iago Espinoza</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/13649073?s=460&u=7171c01e60916597984c2802b7753cef11563e9d&v=4"
                  alt="Iago Espinoza"
                />
                <strong>Iago Espinoza</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/13649073?s=460&u=7171c01e60916597984c2802b7753cef11563e9d&v=4"
                  alt="Iago Espinoza"
                />
                <strong>Iago Espinoza</strong>
              </div>
            </Appointment>
          </Section>
          <strong>Tarde</strong>
          <Appointment>
            <span>
              <FiClock />
              08:00
            </span>
            <div>
              <img
                src="https://avatars2.githubusercontent.com/u/13649073?s=460&u=7171c01e60916597984c2802b7753cef11563e9d&v=4"
                alt="Iago Espinoza"
              />
              <strong>Iago Espinoza</strong>
            </div>
          </Appointment>
          <Section />
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
