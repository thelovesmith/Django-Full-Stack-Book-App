from django.http import JsonResponse
## Import the django View class, so we can make
## views be classes
from django.views import View
from .models import Book

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie

## This will help in the parsing/creating of json
import json

# Create your views here.

class Books(View):
    ## inheriting from the view class
    ## For testing purposes/for development
    # ## were exempting csrf token from our requests
    # @method_decorator(csrf_exempt)
    # def dispatch(self, request, *args, **kwargs):
    #     return super(Books, self).dispatch(request, *args, **kwargs)



    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        ### .values returns what is called a value
        ## query set, which basically a list of dictionaries

        ## safe=False allows us to send back any data type that is
        ## jsonable,
        ## otherwise it only takes dictionaries,
        ## we want to send a list
        book_list = list(Book.objects.values())
        return JsonResponse({
            'Content-Type': 'application/json',
            'status': 200,
            'data': book_list
            }, safe=False)


    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        # read the body of the request (think, body-parser)
        #but not middleware
        data = request.body.decode('utf-8')

        # parse the json (bodyParser.json()) in express
        data = json.loads(data)
        # print(data, ' this is data', data["title"], data["author"], data["year"])
        # so now we have the dictonary ^
        try:

            new_book = Book(title=data["title"], author=data["author"], year=data["year"])
            ##^ createing a new book

            new_book.save()
            data["id"] = new_book.id
            ## You can retrieve the id after you save, because then its
            ## actually been added to the database

            return JsonResponse({"data": data}, safe=False)
        except:
            return JsonResponse({"error": "not valid data"}, safe=False)


class Book_detail(View):

    # @method_decorator(csrf_exempt)
    # def dispatch(self, request, *args, **kwargs):
    #     return super(Book_detail, self).dispatch(request, *args, **kwargs)


    @method_decorator(ensure_csrf_cookie)
    def get(self, request, pk):
        ## Reason we have to do this is to make it
        ## JSONifiable
        book_list = list(Book.objects.filter(pk=pk).values())
        print(Book.objects.filter(pk=pk).values(), ' this is .values in the get')
        return JsonResponse({"data": book_list}, safe=False)

    @method_decorator(ensure_csrf_cookie)
    def put(self, request, pk):
        data = request.body.decode('utf-8')
        ### this below will give us a dictonary we can work with
        data = json.loads(data)

        try:
            edit_book = Book.objects.get(pk=pk)
            data_key = list(data.keys())
            ## data_key = ['author', 'title', 'year']
            for key in data_key:
                if key == "title":
                    edit_book.title = data[key]
                if key == "author":
                    edit_book.author = data[key]

                if key == "year":
                    edit_book.year = data[key]
            ## now that we edited whatever keys may need to have been
            ## edited we have to write it to the database by using .save
            ## remember edit_book is an instance of our Model
            edit_book.save()
            data["id"] = edit_book.id

            return JsonResponse({"data": data}, safe=False)

        except Book.DoesNotExist:
            return JsonResponse({"error": "Your books primary key doesn't exist"}, safe=False)

        except:
            return JsonResponse({"error": "not a valid data"}, safe=False)






    @method_decorator(ensure_csrf_cookie)
    def delete(self, request, pk):
        try:
            # we find it
            book_delete = Book.objects.get(pk=pk)
            # then we delete it
            book_delete.delete()
            return JsonResponse({"data": True}, safe=False)
        except:
            return JsonResponse({"error": "Not a valid key"}, safe=False)

# router.get('/:pk')

