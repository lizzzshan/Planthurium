from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from .models import Item
from .forms import NewItemForm, EditItemForm
# Create your views here.

def detail(request, pk): #pk = primary key
    item = get_object_or_404(Item, pk=pk)
    related_items = Item.objects.filter(category=item.category, is_sold=False).exclude(pk=pk)[0:3]

    return render(request, 'item/detail.html',{
        'item': item,
        'related_items': related_items
    })

@login_required
def new(request): # Require login
    if request.method == 'POST':
        form = NewItemForm(request.POST, request.FILES)

        # make sure user is signed in to create item
        if form.is_valid():
            item = form.save(commit=False)
            item.created_by = request.user
            item.save()

            return redirect('item:detail', pk=item.id)
    else:
        form = NewItemForm()

    return render(request, 'item/form.html',{
        'form':form,
        'title': 'New item',
    })

# need to be logged in to delete item
@login_required
def delete(request, pk):
    item = get_object_or_404(Item, pk=pk, created_by=request.user)
    item.delete()

    # redir back to index page of dashboard
    return redirect('dashboard:index')

# Edit item form 
@login_required
def edit(request, pk): # Require login
    item = get_object_or_404(Item, pk=pk, created_by=request.user)

    if request.method == 'POST':
        form = EditItemForm(request.POST, request.FILES, instance=item)

        # make sure user is signed in to create item
        if form.is_valid():
            form.save()

            return redirect('item:detail', pk=item.id)
    else:
        form = EditItemForm(instance=item)

    return render(request, 'item/form.html',{
        'form':form,
        'title': 'Edit item',
    })
