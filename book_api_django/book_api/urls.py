from django.urls import path
from .views import Books, Book_detail


urlpatterns = [
  path('', Books.as_view()),
  path('<int:pk>/', Book_detail.as_view())
]