from django.utils.crypto import get_random_string

#generate a unique PK
def pk_gen(queryset,length=8):
    pk = get_random_string(length)
    while queryset.filter(pk=pk).exists():
        pk = get_random_string(length)

    return pk