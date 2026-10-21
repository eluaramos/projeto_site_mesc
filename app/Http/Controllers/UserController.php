<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class UserController extends Controller
{
    private const ROLES = ['admin', 'editor', 'revisor', 'colaborador'];

    public function index(Request $request)
    {
        $filters = $request->validate(['q' => ['nullable', 'string', 'max:200']]);

        return Inertia::render('Cms/Users', [
            'users' => User::with('roles')
                ->when($filters['q'] ?? null, fn ($query, $q) => $query->where(fn ($query) => $query->whereRaw('LOWER(name) LIKE ?', ['%'.mb_strtolower($q).'%'])
                    ->orWhereRaw('LOWER(email) LIKE ?', ['%'.mb_strtolower($q).'%'])))
                ->orderBy('name')->paginate(20)->withQueryString()
                ->through(fn ($user) => ['id' => $user->id, 'name' => $user->name, 'email' => $user->email,
                    'roles' => $user->getRoleNames(), 'created_at' => $user->created_at]),
            'filters' => $filters,
        ]);
    }

    public function create()
    {
        return Inertia::render('Cms/EditUser', ['user' => null, 'availableRoles' => self::ROLES]);
    }

    public function edit(User $user)
    {
        return Inertia::render('Cms/EditUser', ['user' => [
            'id' => $user->id, 'name' => $user->name, 'email' => $user->email, 'roles' => $user->getRoleNames(),
        ], 'availableRoles' => self::ROLES]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $user = DB::transaction(function () use ($data) {
            $user = User::create(['name' => $data['name'], 'email' => $data['email'], 'password' => $data['password']]);
            $user->syncRoles($data['roles']);

            return $user;
        });

        return redirect()->route('cms.users.edit', $user);
    }

    public function update(Request $request, User $user)
    {
        $data = $this->validated($request, $user);
        if ($request->user()->id === $user->id && ! in_array('admin', $data['roles'], true)) {
            throw ValidationException::withMessages(['roles' => 'Você não pode remover seu próprio perfil de administrador.']);
        }
        DB::transaction(function () use ($data, $user) {
            $fields = ['name' => $data['name'], 'email' => $data['email']];
            if ($user->email !== $data['email']) {
                $fields['email_verified_at'] = null;
            }
            if (! empty($data['password'])) {
                $fields['password'] = $data['password'];
            }
            $user->update($fields);
            $user->syncRoles($data['roles']);
        });

        return back();
    }

    public function destroy(Request $request, User $user)
    {
        if ($request->user()->id === $user->id) {
            throw ValidationException::withMessages(['user' => 'Você não pode excluir sua própria conta.']);
        }
        $user->delete();

        return redirect()->route('cms.users.index');
    }

    private function validated(Request $request, ?User $user = null): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'lowercase', 'max:255', Rule::unique('users', 'email')->ignore($user?->id)],
            'password' => [$user ? 'nullable' : 'required', 'string', 'max:255', 'confirmed', Password::min(12)->letters()->numbers()],
            'roles' => ['required', 'array', 'min:1', 'max:4'],
            'roles.*' => ['required', 'string', 'distinct', Rule::in(self::ROLES), Rule::exists('roles', 'name')->where('guard_name', 'web')],
        ]);
    }
}
