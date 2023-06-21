@extends('admin.layouts.master')
@section("title") Kitchen's Stores - Dashboard
@endsection
@section('content')
<style>
    .assigning-checkboxes label {
    margin-right: 10px;
    background-color: rgba(250, 250, 250, 0.3);
    border-radius: 25px;
    margin-bottom: 1.2rem;
    }
    .assigning-checkboxes label span {
    text-align: center;
    display: block;
    padding: 8px 15px;
    border: 1px solid #eee;
    border-radius: 25px;
    }
    .assigning-checkboxes label input {
    position: absolute;
    top: -20px;
    display: none;
    }
    .assigning-checkboxes input:checked + span {
    background-color: #2ebf91;
    padding: 8px 15px;
    color: #fff;
    border: 1px solid #eee;
    }
</style>
<div class="page-header">
    <div class="page-header-content header-elements-md-inline">
        <div class="page-title d-flex">
            <h4><i class="icon-circle-right2 mr-2"></i>
                <span class="font-weight-bold mr-2">Editing</span>
                <span class="badge badge-primary badge-pill animated flipInX">"{{ $user->email }}"</span>
            </h4>
            <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
        </div>
    </div>
</div>
<div class="content">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <legend class="font-weight-semibold text-uppercase font-size-sm">
                    <i class="icon-address-book mr-2"></i> Kitchen Details
                </legend>
                <div class="form-group row form-group-feedback form-group-feedback-right">
                    <div class="col-lg-9">
                        <form action="{{ route('admin.update.kitchen') }}" method="POST" class="p-3">
                            <input type="hidden" name="kitchen_id" value="{{ $user->kitchen->id }}">
                            <div class="form-group row">
                                <label class="col-lg-4 col-form-label">Kitchen Code:</label>
                                <div class="col-lg-8">
                                    <input type="text" class="form-control form-control-lg"
                                        name="code"
                                        value="@if ($user->kitchen){{$user->kitchen->code}}@endif"
                                        placeholder="AKK8978" required>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-lg-4 col-form-label">Kitchen Name:</label>
                                <div class="col-lg-8">
                                    <input type="text" class="form-control form-control-lg"
                                        name="name"
                                        value="@if ($user->kitchen){{$user->kitchen->name}}@endif" 
                                        placeholder="Main Kitchen"
                                        required>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-lg-4 col-form-label">Kitchen Phone:</label>
                                <div class="col-lg-8">
                                    <input type="text" class="form-control form-control-lg"
                                        name="phone"
                                        value="@if ($user->kitchen){{$user->kitchen->phone}}@endif" 
                                        placeholder="0712345678">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-lg-4 col-form-label">Kitchen Address:</label>
                                <div class="col-lg-8">
                                    <input type="text" class="form-control form-control-lg"
                                        name="address"
                                        value="@if ($user->kitchen){{$user->kitchen->address}}@endif" 
                                        placeholder="Gampaha">
                                </div>
                            </div>
                            @csrf
                            <div class="text-right">
                                <button type="submit" class="btn btn-secondary">
                                    Update Kitchen
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection