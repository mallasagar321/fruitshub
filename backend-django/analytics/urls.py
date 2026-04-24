from django.urls import path
from . import views

urlpatterns = [
    path('profit-loss',  views.ProfitLossView.as_view()),
    path('seasonality',  views.SeasonalityView.as_view()),
]