from django.urls import path 
from .views import LoginView, UsuarioListCreate, UsuarioRetriveveUpdateDestroy, DisciplinaListCreate, DisciplinaRetriveveUpdateDestroy, DisciplinaProfessorList, ReservaAmbienteListCreate, ReservaAmbienteRetriveveUpdateDestroy, ReservaAmbienteProfessorList, SalaListCreate, SalaRetriveveUpdateDestroy


urlpatterns = [
    # login
    path('login/', LoginView.as_view()),

    # Usuário
    path('usuario/', UsuarioListCreate.as_view()),
    path('usuario/<int:pk>/', UsuarioRetriveveUpdateDestroy.as_view()),

    # Disciplina
    path('disciplina/', DisciplinaListCreate.as_view()),
    path('disciplina/<int:pk>/', DisciplinaRetriveveUpdateDestroy.as_view()),
    path('disciplina_professor/', DisciplinaProfessorList.as_view()),

    # Reserva
    path('reserva/', ReservaAmbienteListCreate.as_view()),
    path('reserva/<int:pk>/', ReservaAmbienteRetriveveUpdateDestroy.as_view()),
    path('reserva_professor/', ReservaAmbienteProfessorList.as_view()),

    # Sala
    path('sala/', SalaListCreate.as_view()),
    path('sala/<int:pk>/', SalaRetriveveUpdateDestroy.as_view()),
  

]


