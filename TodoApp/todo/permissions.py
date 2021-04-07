from rest_framework.permissions import BasePermission

#custom permission
class IsAuthorOrAnonReadOnly(BasePermission):
    message = 'editing and deleting is restricted to the author only'

    def has_object_permission(self, request, view, obj):
        return obj.author == request.user